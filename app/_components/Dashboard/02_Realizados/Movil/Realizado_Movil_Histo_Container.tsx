import { getCachedRealizadosYearBySectorAction } from '@/app/_lib/actions/realizados.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getFullYearOf } from '@/app/_lib/utils/getFullYearOf'
import React from 'react'
import { RealizadoMovilHisto } from './Realizado_Movil_Histo'

export default async function RealizadoMovilHistoContainer({ realizado }: { realizado: PagoType }) {

  const [fromDate, toDate] = getFullYearOf(getActualDateStr())
  const realizadosYearBySector = await getCachedRealizadosYearBySectorAction(realizado, fromDate, toDate)

  // Map 'rubro' to the allowed union type
  const mappedRealizadosYearBySector = realizadosYearBySector.map((item) => ({
    ...item,
    rubro: item.rubro as "ragazzi" | "patricios" | "palihue" | "jmolina",
  }))

  return (
    <RealizadoMovilHisto realizado={realizado} allRealizados={mappedRealizadosYearBySector} />
  )
}