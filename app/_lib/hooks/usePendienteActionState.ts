import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";

export const usePendienteActionState = () => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async () => {

    toast.success("Vencimiento actualizado")
    router.push("/pendientes")

    return

  },
    null
  );

  return [formState, formAction, isPending] as const
}