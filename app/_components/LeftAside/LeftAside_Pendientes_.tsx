import { getCachedSectoresActualesAction } from "@/app/_lib/actions/sectores.action"
import LeftAsideSectoresForm from "./LeftAside_Pendientes_Sectores_List"
import LeftAsidePendientesResetSectores from "./LeftAside_Pendientes_Reset_Sectores"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActualesAction()

  return (
    <>
      <LeftAsideSectoresForm sectoresActuales={sectoresActuales as { _id: "ragazzi" | "patricios" | "palihue" | "jmolina"; sectores: string[]; }[]} />
      <LeftAsidePendientesResetSectores />
    </>

  )
}


