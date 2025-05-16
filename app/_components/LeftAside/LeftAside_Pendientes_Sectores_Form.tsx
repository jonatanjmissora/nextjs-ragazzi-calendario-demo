"use client"

import PlaySVG from "@/app/_assets/PlaySVG"
import { getActualDateStr } from "@/app/_lib/utils/getActualDate"
import { useState } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../SubmitBtn"

export const Sectores = ({ rubro, sectores, setActualRubro }: { rubro: string, sectores: string[], setActualRubro: React.Dispatch<React.SetStateAction<string>> }) => {

  const [actualSector, setActualSector] = useState<string>("")

  const formAction = () => {

    toast.success("Vencimiento agendado exitosamente")
    setActualRubro("")

  }


  return (
    <ul className={`collapse-content pt-2 ${rubro} rounded`}>

      <div className="flex flex-wrap gap-1">
        {
          sectores.map((sector, index) =>
            <li
              className={`${actualSector === sector && "bg-foreground80"} font-leftAside-pend-sector border border-transparent     hover:text-foreground80 py-1 px-2 rounded`}
              key={index}
            >
              <button onClick={() => setActualSector(sector)}>
                {sector}
              </button>
            </li>)
        }
      </div>

      <form action={formAction} className="flex flex-wrap gap-2 pt-2">
        <input type="hidden" name="rubro" defaultValue={rubro} />
        <input type="hidden" name="sector" defaultValue={actualSector} />
        <input className="w-full input-main     font-leftAside-pend-inputs" type="date" name="vencimiento" defaultValue={getActualDateStr()} />
        <div className="flex gap-1 w-full h-9">
          <input className="w-2/3 input-main   text-right font-leftAside-pend-inputs" placeholder="monto" defaultValue={0} type="number" name="monto" onFocus={(e) => e.currentTarget.select()} />
          <SubmitBtn isPending={false} className="btn-main w-1/3 h-full">
            <PlaySVG className="size-5 text-inherit" currentColor="currentColor" />
          </SubmitBtn>
        </div>
      </form>

    </ul>
  )
}