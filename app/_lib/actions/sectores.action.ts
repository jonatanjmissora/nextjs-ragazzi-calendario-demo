"use server"

import { sectoresActualesMock, sectoresResetMock } from "../mock-data/sectores-data"

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getSectoresActualesAction = async () => {
  return sectoresActualesMock
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedSectoresResetAction = async () => {
  return sectoresResetMock
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedSectoresActualesAction = async () => {
  return sectoresActualesMock
}