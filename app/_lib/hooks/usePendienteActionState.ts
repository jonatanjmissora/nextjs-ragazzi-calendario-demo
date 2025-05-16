import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { PagoType } from "../schema/pago.type";
import { ServerResponseType } from "../schema/serverResponse.type";

export const usePendienteActionState = (pendiente: PagoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponseType, formData: FormData) => {

    toast.success("Vencimiento actualizado")
    router.push("/pendientes")

    return

  },
    null
  );

  return [formState, formAction, isPending] as const
}