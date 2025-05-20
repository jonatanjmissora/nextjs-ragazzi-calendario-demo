import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";

export const useRealizadoActionState = () => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async () => {

    console.log("Hasta aca llego")
    toast.success("Vencimiento editado")
    router.push("/admin")

    return
  },
    null
  );

  return [formState, formAction, isPending] as const
}