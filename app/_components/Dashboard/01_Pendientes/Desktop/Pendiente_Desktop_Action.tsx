"use client"

import Link from 'next/link'
import toast from 'react-hot-toast'
import EditSVG from '@/app/_assets/EditSVG'
import DollarSVG from '@/app/_assets/DollarSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import SubmitBtn from '@/app/_components/SubmitBtn'
import { PendienteDeleteModal } from '../Pendiente_Delete_Modal'

export default function PendienteDesktopAction({ pendiente, dialogRef }: { pendiente: PagoType, dialogRef?: React.RefObject<HTMLDialogElement | null> }) {

  const formAction = () => {

    toast.success("Vencimiento pagado")
    if (dialogRef) dialogRef.current?.close()
  }

  return (
    <div className='flex justify-evenly lg:justify-around items-center'>

      <form action={formAction} className='flex justify-center items-center'>
        <SubmitBtn isPending={false} className='' classNameSVG="size-9">
          <DollarSVG className='size-9 p-[0.4rem] text-[#005300] hover:text-[#35da35e7]' currentColor='currentColor' />
        </SubmitBtn>
      </form>

      <PendienteDeleteModal pendiente={pendiente} dialogRef2={dialogRef} />

      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-9 p-[0.4rem] text-black hover:text-[#222]' currentColor='currentColor' />
      </Link>

    </div>
  )
}

