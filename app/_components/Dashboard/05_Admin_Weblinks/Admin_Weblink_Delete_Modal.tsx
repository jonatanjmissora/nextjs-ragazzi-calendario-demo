"use client"

import TrashSVG from "@/app/_assets/TrashSVG"
import { WeblinkType } from "@/app/_lib/schema/weblink.type"
import { useActionState, useRef } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../../SubmitBtn"

export const WeblinkDeleteModal = ({ weblink }: { weblink: WeblinkType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const [, formAction, isPending] = useActionState(async () => {

    toast.success("Link eliminado")
    dialogRef.current?.close()

  }, null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-8 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-lg text-[#222] text-left tracking-widest">¿ Seguro desea elimiar</span>
            <span className="font-bold text-lg text-[#222] text-left tracking-widest">{weblink._id} ?</span>
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