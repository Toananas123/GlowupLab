-- Glow Up Lab — schéma Supabase (à exécuter dans l'éditeur SQL du projet).
-- Tables : user_data (privé), profiles, friends, social (visibles des amies).
-- Ré-exécutable : utilise IF NOT EXISTS / CREATE OR REPLACE.

-- ---------------------------------------------------------------------------
-- Données privées : état de l'appli + journal des séances
-- ---------------------------------------------------------------------------
create table if not exists public.user_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,   -- exercices perso, routines, planning, programmes, mensurations, cycle, objectifs…
  journal    jsonb not null default '[]'::jsonb,   -- séances terminées
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profil public léger
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  pseudo       text not null default '',
  code         text not null unique,                -- code d'invitation GLOW-XXX
  avatar_color text not null default '#781539',
  bio          text not null default '',
  hide_loads   boolean not null default false,      -- « masquer mes charges » au Club
  public_data  jsonb not null default '{}'::jsonb,  -- planning de la semaine, stats légères (jamais cycle ni mensurations)
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Amitiés : « user_id a ajouté friend_id »
-- ---------------------------------------------------------------------------
create table if not exists public.friends (
  user_id    uuid not null references auth.users(id) on delete cascade,
  friend_id  uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

-- ---------------------------------------------------------------------------
-- Club : une ligne par personne et par type (feed, reacts, wizz)
-- ---------------------------------------------------------------------------
create table if not exists public.social (
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('feed', 'reacts', 'wizz')),
  data       jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind)
);

-- ---------------------------------------------------------------------------
-- Fonctions utilitaires
-- ---------------------------------------------------------------------------
-- Deux personnes sont amies si l'une a ajouté l'autre.
create or replace function public.are_friends(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.friends
    where (user_id = a and friend_id = b) or (user_id = b and friend_id = a)
  );
$$;

-- Retrouve une amie par son code : ne renvoie que l'id et le pseudo.
create or replace function public.find_by_code(p_code text)
returns table (id uuid, pseudo text) language sql stable security definer set search_path = public as $$
  select p.id, p.pseudo from public.profiles p
  where upper(p.code) = upper(trim(p_code)) and p.id <> auth.uid()
  limit 1;
$$;

-- Génère un code GLOW-XXX unique (sans caractères ambigus : ni 0/O, ni 1/I).
create or replace function public.generate_glow_code()
returns text language plpgsql volatile set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  c text;
begin
  loop
    c := 'GLOW-';
    for i in 1..3 loop
      c := c || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from public.profiles where code = c);
  end loop;
  return c;
end;
$$;

-- Crée le profil et la ligne de données à l'inscription.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, pseudo, code)
  values (new.id, coalesce(new.raw_user_meta_data->>'pseudo', ''), public.generate_glow_code())
  on conflict (id) do nothing;
  insert into public.user_data (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Suppression de son propre compte (et de toutes ses données, par cascade).
create or replace function public.delete_my_account()
returns void language sql security definer set search_path = public as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- updated_at automatique
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;
drop trigger if exists touch_user_data on public.user_data;
create trigger touch_user_data before update on public.user_data for each row execute function public.touch_updated_at();
drop trigger if exists touch_profiles on public.profiles;
create trigger touch_profiles before update on public.profiles for each row execute function public.touch_updated_at();
drop trigger if exists touch_social on public.social;
create trigger touch_social before update on public.social for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.user_data enable row level security;
alter table public.profiles  enable row level security;
alter table public.friends   enable row level security;
alter table public.social    enable row level security;

-- user_data : propriétaire uniquement
drop policy if exists "user_data owner" on public.user_data;
create policy "user_data owner" on public.user_data for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- profiles : soi-même + amies en lecture, soi-même en écriture
drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.are_friends(auth.uid(), id));
drop policy if exists "profiles write" on public.profiles;
create policy "profiles write" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- friends : visibles et supprimables par les deux personnes, ajout par soi-même
drop policy if exists "friends read" on public.friends;
create policy "friends read" on public.friends for select to authenticated
  using (user_id = auth.uid() or friend_id = auth.uid());
drop policy if exists "friends insert" on public.friends;
create policy "friends insert" on public.friends for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "friends delete" on public.friends;
create policy "friends delete" on public.friends for delete to authenticated
  using (user_id = auth.uid() or friend_id = auth.uid());

-- social : soi-même + amies en lecture, soi-même en écriture
drop policy if exists "social read" on public.social;
create policy "social read" on public.social for select to authenticated
  using (user_id = auth.uid() or public.are_friends(auth.uid(), user_id));
drop policy if exists "social write" on public.social;
create policy "social write" on public.social for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Temps réel (Club + synchronisation entre appareils)
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['user_data', 'profiles', 'friends', 'social'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
