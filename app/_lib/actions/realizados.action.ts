"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { eliminarRealizadoDB, editarRealizadoDb, insertarRealizadoDB, getRealizadosYearBySectorDB } from "../mock-data/realizados.db"
import { pagoSchema, PagoType } from "../schema/pago.type"
import { realizadosMock } from "../mock-data/realizados-data"

function getRealizadosFilter(fromDate: string, toDate: string) {
  return realizadosMock
    .filter(pago => pago.vencimiento >= fromDate && pago.vencimiento <= toDate)
    .sort((a, b) => a.vencimiento.localeCompare(b.vencimiento))
}


export const getRealizadoByIdAction = async (id: string) => {
  return realizadosMock[parseInt(id, 10)]
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosAction = async () => {
  return realizadosMock
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosAction = unstable_cache(async () => {
  return realizadosMock
}
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosFilterAction = async (fromDate: string, toDate: string) => {
  return getRealizadosFilter(fromDate, toDate)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosFilterAction = unstable_cache(async (fromDate: string, toDate: string) => {
  return getRealizadosFilter(fromDate, toDate)
}
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosYearBySectorAction = async (realizado: PagoType, fromDate: string, toDate: string) => {
  return await getRealizadosYearBySectorDB(realizado, fromDate, toDate)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosYearBySectorAction = unstable_cache(async (realizado: PagoType, fromDate: string, toDate: string) => {
  return await getRealizadosYearBySectorAction(realizado, fromDate, toDate)
},
  ["realizados"],
  {
    tags: ["realizados"],
    revalidate: 3600,
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarRealizadoAction = async (realizado: PagoType) => {
  const res = await eliminarRealizadoDB(realizado)
  if (res.success) {
    revalidateTag("realizados")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoAction = async (newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const res = await editarRealizadoDb(data)
  if (res.success) {
    revalidateTag("realizados")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewRealizadoAction = async (realizado: PagoType, newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const deleteResponse = await eliminarRealizadoDB(realizado)
  if (!deleteResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: deleteResponse.message
    }
  }

  const insertResponse = await insertarRealizadoDB(data)
  if (!insertResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: insertResponse.message
    }
  }

  revalidateTag("realizados")
  return insertResponse
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarRealizadoAction = async (newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const insertResponse = await insertarRealizadoDB(data)
  if (!insertResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: insertResponse.message
    }
  }

  revalidateTag("realizados")
  return insertResponse
}