"use server"

import { pendientesMock } from "../mock-data/pendientes-data"

export const getPendienteByIdAction = async (id: string) => {
  return pendientesMock.filter(p => p._id === id)[0]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getPendientesAction = async () => {
  return pendientesMock
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedPendientesAction = async () => {
  return pendientesMock
}
