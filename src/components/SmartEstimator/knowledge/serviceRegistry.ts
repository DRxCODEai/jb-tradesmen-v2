import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import { drywallRepair, baseboardTrimRepair, interiorDoorRepairReplacement, exteriorDoorRepairReplacement, windowTrimRepair } from '../services/interior'
import { lockChange, ceilingTileReplacement, generalHandymanRepair } from '../services/maintenance'
import { exteriorPainting, interiorPainting } from '../services/painting'

export const SERVICE_REGISTRY: readonly MasterServiceTemplate[] = [
  drywallRepair,
  interiorPainting,
  exteriorPainting,
  baseboardTrimRepair,
  interiorDoorRepairReplacement,
  exteriorDoorRepairReplacement,
  lockChange,
  windowTrimRepair,
  ceilingTileReplacement,
  generalHandymanRepair,
]
