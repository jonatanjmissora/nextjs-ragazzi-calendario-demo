"use client"

import { logout } from "@/app/_lib/actions/user.action"
import { useRef } from "react"
import SubmitBtn from "../SubmitBtn"
import LogoutSVG from "@/app/_assets/LogoutSVG"

export default function NavbarLogoutModal({ setShowMenu }: { setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) {


  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClick = async () => {
    dialogRef.current?.close()
    setShowMenu(false)
  }

  return (
    <>
      <button className="text-base text-foreground w-60 border-t border-foreground25 flex justify-end items-center gap-2 pt-4 hover:text-foreground80" onClick={() => dialogRef.current?.showModal()}>
        <LogoutSVG className="size-5" currentColor="currentColor" />
        Cerrar Sesión
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-10 fixed top-[50%] left-[50%]">
          <span className="font-bold text-lg text-[#222] tracking-widest text-left">¿ Seguro desea cerrar sesión ?</span>
          <div className="modal-action">
            <form onSubmit={() => logout()} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={false} text="Si" className="size-11" />
              <button onClick={handleClick} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

