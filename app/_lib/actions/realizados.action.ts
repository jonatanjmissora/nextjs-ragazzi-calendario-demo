"use server"

import { PagoType } from "../schema/pago.type"
import { realizadosMock } from "../mock-data/realizados-data"

function getRealizadosFilter(fromDate: string, toDate: string) {
  return realizadosMock
    .filter(pago => pago.vencimiento >= fromDate && pago.vencimiento <= toDate)
    .sort((a, b) => a.vencimiento.localeCompare(b.vencimiento))
}


export const getRealizadoByIdAction = async (id: string) => {
  return realizadosMock.filter(p => p._id === id)[0]
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosAction = async () => {
  return realizadosMock
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosAction = async () => {
  return realizadosMock
}


/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosFilterAction = async (fromDate: string, toDate: string) => {
  return getRealizadosFilter(fromDate, toDate)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosFilterAction = async (fromDate: string, toDate: string) => {
  return getRealizadosFilter(fromDate, toDate)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosYearBySectorAction = async (realizado: PagoType, fromDate: string, toDate: string) => {

  return realizadosMock
    .filter(pago => pago.rubro === realizado.rubro
      && pago.sector === realizado.sector
      && pago.vencimiento >= fromDate
      && pago.vencimiento <= toDate)
    .sort((a, b) => a.vencimiento.localeCompare(b.vencimiento))

}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosYearBySectorAction = async (realizado: PagoType, fromDate: string, toDate: string) => {
  return await getRealizadosYearBySectorAction(realizado, fromDate, toDate)
}