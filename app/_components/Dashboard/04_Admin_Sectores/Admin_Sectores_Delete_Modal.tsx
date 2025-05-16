"use client"

import TrashSVG from "@/app/_assets/TrashSVG"
import { useActionState, useRef } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../../SubmitBtn"

export default function AdminSectoresDeleteModal({ sectoresType, rubro, sector, sectores }: { sectoresType: string, rubro: string, sector: string, sectores: string[] }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const [, formAction, isPending] = useActionState(async () => {

    toast.success("Sector borrado")
    dialogRef.current?.close()

  }, null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className="size-4 text-foreground hover:text-foreground80" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-lg text-[#222] text-center tracking-widest">¿ Seguro desea elimiar</span>
            <span className="font-bold text-lg text-[#222] text-center tracking-widest">{sector} ?</span>
          </div>
          <div className="modal-action">
            <form action={formAction} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={isPending} text="Si" className="size-11" />
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
