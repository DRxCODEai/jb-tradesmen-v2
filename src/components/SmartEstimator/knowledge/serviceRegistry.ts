import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import { drywallRepair, baseboardTrimRepair, interiorDoorRepairReplacement, exteriorDoorRepairReplacement, windowTrimRepair } from '../services/interior'
import { lockChange, ceilingTileReplacement, generalHandymanRepair } from '../services/maintenance'
import { exteriorPainting, interiorPainting } from '../services/painting'
import { laminateFlooring, luxuryVinylPlankFlooring } from '../services/flooring'
import { groutCaulkRepair, tileRepair } from '../services/tile'
import { faucetReplacement, hoseBibRepairReplacement, minorPlumbingLeakRepair, shutoffValveReplacement, toiletRepairReplacement, waterHeaterReplacement } from '../services/plumbing'
import { electricalTroubleshooting, lightFixtureReplacement, switchOutletReplacement } from '../services/electrical'
import { hvacDiagnosticMinorRepair, thermostatReplacement } from '../services/hvac'

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
  luxuryVinylPlankFlooring,
  laminateFlooring,
  tileRepair,
  groutCaulkRepair,
  faucetReplacement,
  toiletRepairReplacement,
  shutoffValveReplacement,
  minorPlumbingLeakRepair,
  waterHeaterReplacement,
  hoseBibRepairReplacement,
  lightFixtureReplacement,
  switchOutletReplacement,
  electricalTroubleshooting,
  thermostatReplacement,
  hvacDiagnosticMinorRepair,
]
