"use client"

import TrashSVG from "@/app/_assets/TrashSVG"
import { PagoType } from "@/app/_lib/schema/pago.type"
import { useRef } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../../SubmitBtn"

export const PendienteDeleteModal = ({ pendiente, dialogRef2 }: { pendiente: PagoType, dialogRef2?: React.RefObject<HTMLDialogElement | null> }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const formAction = () => {

    toast.success("Vencimiento borrado")
    if (dialogRef2) dialogRef2.current?.close()
    dialogRef.current?.close()

  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-9 p-[0.4rem] text-[#880000aa] hover:text-[#f35252]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-4 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-[#222]">¿ Seguro desea elimiar</h3>
            <h3 className="font-bold text-lg text-[#222] ">{pendiente._id} ?</h3>
          </div>
          <div className="modal-action">
            <form action={formAction} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={false} text="Si" className="size-11" />
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}