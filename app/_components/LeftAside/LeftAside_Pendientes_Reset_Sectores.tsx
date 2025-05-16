"use client"

import { useActionState } from "react"
import SubmitBtn from "../SubmitBtn"

export default function LeftAsidePendientesResetSectores() {

  const [, formAction, isPending] = useActionState(async () => {

    return

  }, null)

  return (
    <form action={formAction} className="flex flex-col gap-2 items-center">
      <SubmitBtn text="reload" isPending={isPending} className="px-4 py-0 h-8 w-16 font-light text-sm" classNameSVG="" />
    </form>
  )
}
