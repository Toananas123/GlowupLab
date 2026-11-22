import { useEffect, useState } from 'react'
import { watchState } from '../../lib/cloud'
import { getCycle, saveCycle, type CycleData } from './cycle'

/** Données du cycle, mises à jour à chaque modification (y compris depuis un autre appareil). */
export function useCycle(): [CycleData, (patch: Partial<CycleData>) => void] {
  const [cycle, setCycle] = useState<CycleData>(getCycle)
  useEffect(() => watchState(() => setCycle(getCycle())), [])
  return [cycle, saveCycle]
}
