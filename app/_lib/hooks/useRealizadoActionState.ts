import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { PagoType } from "../schema/pago.type";
import { ServerResponseType } from "../schema/serverResponse.type";

const sameId = (prevData: PagoType, newRealizado: PagoType) => {

  return (newRealizado.rubro === prevData.rubro &&
    newRealizado.sector === prevData.sector &&
    newRealizado.vencimiento === prevData.vencimiento
  )
}

export const useRealizadoActionState = (realizado: PagoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponseType, formData: FormData) => {

    console.log("Hasta aca llego")
    toast.success("Vencimiento editado")
    router.push("/admin")

    return
  },
    null
  );

  return [formState, formAction, isPending] as const
}