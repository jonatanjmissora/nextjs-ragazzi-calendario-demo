"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { editarPendienteDB, eliminarPendienteDB, insertarPendienteDB } from "../mock-data/pendientes.db"
import { pagoSchema, PagoType } from "../schema/pago.type"

export const pendientesMock = [
  {
    _id: '2024-12-04-jmolina-internet',
    rubro: 'jmolina',
    sector: 'internet',
    monto: '55920',
    vencimiento: '2024-12-04',
    pagado: ''
  },
  {
    _id: '2024-12-06-ragazzi-telefono',
    rubro: 'ragazzi',
    sector: 'telefono',
    monto: '29504',
    vencimiento: '2024-12-06',
    pagado: ''
  },
  {
    _id: '2024-12-07-patricios-gas',
    rubro: 'patricios',
    sector: 'gas',
    monto: '3278',
    vencimiento: '2024-12-07',
    pagado: ''
  },
  {
    _id: '2024-12-09-patricios-visa',
    rubro: 'patricios',
    sector: 'visa',
    monto: '423853',
    vencimiento: '2024-12-09',
    pagado: ''
  },
  {
    _id: '2024-12-10-patricios-cochera',
    rubro: 'patricios',
    sector: 'cochera',
    monto: '22500',
    vencimiento: '2024-12-10',
    pagado: ''
  },
  {
    _id: '2024-12-10-ragazzi-contador',
    rubro: 'ragazzi',
    sector: 'contador',
    monto: '85000',
    vencimiento: '2024-12-10',
    pagado: ''
  },
  {
    _id: '2024-12-10-ragazzi-alquiler',
    rubro: 'ragazzi',
    sector: 'alquiler',
    vencimiento: '2024-12-10',
    monto: '425000',
    pagado: ''
  },
  {
    _id: '2024-12-10-ragazzi-reporte Z1',
    rubro: 'ragazzi',
    sector: 'reporte Z1',
    vencimiento: '2024-12-10',
    monto: '0',
    pagado: ''
  },
  {
    _id: '2024-12-11-jmolina-gas',
    rubro: 'jmolina',
    sector: 'gas',
    monto: '19429',
    vencimiento: '2024-12-11',
    pagado: ''
  },
  {
    _id: '2024-12-12-patricios-municipal',
    rubro: 'patricios',
    sector: 'municipal',
    monto: '10972',
    vencimiento: '2024-12-12',
    pagado: ''
  },
  {
    _id: '2024-12-12-ragazzi-municipal',
    rubro: 'ragazzi',
    sector: 'municipal',
    monto: '48499',
    vencimiento: '2024-12-12',
    pagado: ''
  },
  {
    _id: '2024-12-12-palihue-municipal',
    rubro: 'palihue',
    sector: 'municipal',
    monto: '24015',
    vencimiento: '2024-12-12',
    pagado: ''
  },
  {
    _id: '2024-12-12-jmolina-municipal',
    rubro: 'jmolina',
    sector: 'municipal',
    monto: '20910',
    vencimiento: '2024-12-12',
    pagado: ''
  },
  {
    _id: '2024-12-16-ragazzi-luz',
    rubro: 'ragazzi',
    sector: 'luz',
    monto: '108760',
    vencimiento: '2024-12-16',
    pagado: ''
  },
  {
    _id: '2024-12-16-patricios-federada',
    rubro: 'patricios',
    sector: 'federada',
    monto: '271465',
    vencimiento: '2024-12-16',
    pagado: ''
  },
  {
    _id: '2024-12-17-ragazzi-reporte Z2',
    rubro: 'ragazzi',
    sector: 'reporte Z2',
    monto: '0',
    vencimiento: '2024-12-17',
    pagado: ''
  },
  {
    _id: '2024-12-19-ragazzi-agua',
    rubro: 'ragazzi',
    sector: 'agua',
    monto: '14682',
    vencimiento: '2024-12-19',
    pagado: ''
  },
  {
    _id: '2024-12-19-palihue-agua',
    rubro: 'palihue',
    sector: 'agua',
    monto: '7341',
    vencimiento: '2024-12-19',
    pagado: ''
  },
  {
    _id: '2024-12-19-jmolina-agua',
    rubro: 'jmolina',
    sector: 'agua',
    monto: '7431',
    vencimiento: '2024-12-19',
    pagado: ''
  },
  {
    _id: '2024-12-23-ragazzi-iva',
    rubro: 'ragazzi',
    sector: 'iva',
    monto: '1772606',
    vencimiento: '2024-12-23',
    pagado: ''
  },
  {
    _id: '2024-12-24-ragazzi-reporte Z3',
    rubro: 'ragazzi',
    sector: 'reporte Z3',
    monto: '0',
    vencimiento: '2024-12-24',
    pagado: ''
  },
  {
    _id: '2024-12-30-ragazzi-seguro',
    rubro: 'ragazzi',
    sector: 'seguro',
    monto: '10000',
    vencimiento: '2024-12-30',
    pagado: ''
  }
]

export const getPendienteByIdAction = async (id: string) => {
  return pendientesMock[parseInt(id, 10)]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getPendientesAction = async () => {
  return pendientesMock
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedPendientesAction = unstable_cache(async () => {
  return pendientesMock
}
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarPendienteAction = async (pendiente: PagoType) => {
  const res = await eliminarPendienteDB(pendiente)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarPendienteAction = async (newPendiente: PagoType) => {

  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newPendiente)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newPendiente,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const res = await editarPendienteDB(data)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewPendienteAction = async (oldPendiente: PagoType, newPendiente: PagoType) => {

  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newPendiente)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newPendiente,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const deleteResponse = await eliminarPendienteDB(oldPendiente)
  if (!deleteResponse.success) {
    return deleteResponse
  }

  const insertResponse = await insertarPendienteDB(data)
  if (!insertResponse.success) {
    return insertResponse
  }

  revalidateTag("pendientes")
  return {
    success: true,
    prevState: newPendiente,
    message: `Dato editado con éxito`
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarPendienteAction = async (newPendiente: PagoType) => {
  const res = await insertarPendienteDB(newPendiente)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}
