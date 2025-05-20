import { useActionState } from "react";
import { useRouter } from "next/navigation";

export const useRegisterActionState = () => {

  const router = useRouter()
  const [formState, formAction, isPending] = useActionState(async () => {


    router.push("/pendientes")

    return

  },
    null
  );

  return [formState, formAction, isPending] as const
}
