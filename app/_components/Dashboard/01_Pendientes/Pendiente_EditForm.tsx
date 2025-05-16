"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { usePendienteActionState } from "@/app/_lib/hooks/usePendienteActionState";
import { PagoType } from "@/app/_lib/schema/pago.type";
import EditForm from "../EditForm";

export default function PendienteEditForm({ pendiente, sectoresReset }: { pendiente: PagoType, sectoresReset: SectoresType[] }) {

    const [, formAction, isPending] = usePendienteActionState(pendiente)

    return (
        <EditForm
            pagoType={"pendiente"}
            pago={pendiente}
            sectoresReset={sectoresReset}
            formAction={formAction}
            isPending={isPending}
            formState={null}
        />
    )
}


