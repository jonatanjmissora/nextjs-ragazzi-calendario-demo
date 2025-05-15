"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { resetSectoresActualesDB, updateSectoresActualesDB, updateSectoresResetDB } from "../mock-data/sectores.db"

export const sectoresResetMock = [
  {
    "_id": "ragazzi",
    "sectores": [
      "agua",
      "contador",
      "gas",
      "ing brutos",
      "iva",
      "luz",
      "municipal",
      "seguro",
      "sindicato",
      "sueldo Gus",
      "sueldo Rod",
      "sueldo Jon",
      "suss",
      "tasa",
      "telefono",
      "tran Alon",
      "tran Bal",
      "reporte Z1",
      "reporte Z2",
      "reporte Z3",
      "reporte Z4",
      "alquiler"
    ]
  },
  {
    "_id": "patricios",
    "sectores": [
      "autonomo",
      "celular",
      "cochera",
      "complement",
      "federada",
      "gas",
      "luz",
      "master",
      "municipal",
      "rentas",
      "visa",
      "patente"
    ]
  },
  {
    "_id": "palihue",
    "sectores": [
      "agua",
      "gas",
      "luz",
      "municipal",
      "rentas"
    ]
  },
  {
    "_id": "jmolina",
    "sectores": [
      "agua",
      "gas",
      "luz",
      "municipal",
      "patente",
      "rentas",
      "visa Rio",
      "visa Prov",
      "internet"
    ]
  }
]
export const sectoresActualesMock = [
  {
    "_id": "ragazzi",
    "sectores": [
      "gas",
      "ing brutos",
      "sindicato",
      "suss",
      "tasa",
      "tran Alon",
      "tran Bal"
    ]
  },
  {
    "_id": "patricios",
    "sectores": [
      "celular",
      "complement",
      "patente"
    ]
  },
  {
    "_id": "palihue",
    "sectores": [
      "gas",
      "agua"
    ]
  },
  {
    "_id": "jmolina",
    "sectores": [
      "patente",
      "visa Rio"
    ]
  }
]

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getSectoresActualesAction = async () => {
  return sectoresActualesMock
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedSectoresResetAction = unstable_cache(async () => {
  return sectoresResetMock
}
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedSectoresActualesAction = unstable_cache(async () => {
  return sectoresActualesMock
}
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectoresResetAction = async (rubro: string, newSectores: string[]) => {

  const res = await updateSectoresResetDB(rubro, newSectores)
  if (res.success) {
    revalidateTag("sectores")
  }

  return res
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectoresActualesAction = async (rubro: string, newSectores: string[]) => {

  const res = await updateSectoresActualesDB(rubro, newSectores)
  if (res.success) {
    revalidateTag("sectores")
  }

  return res
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const resetSectoresAction = async () => {

  const res = await resetSectoresActualesDB()
  if (res.success) {
    revalidateTag("sectores")
  }

  return res

}