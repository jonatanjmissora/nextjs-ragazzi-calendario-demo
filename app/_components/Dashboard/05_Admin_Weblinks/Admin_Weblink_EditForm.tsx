"use client"

import UploadSVG from "@/app/_assets/UploadSVG";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react"
import toast from "react-hot-toast";
import SubmitBtn from "../../SubmitBtn";
import AdminWeblinkEditFormModal from "./Admin_Weblink_EditForm_Modal";

export default function WeblinkEditForm({ weblink }: { weblink: WeblinkType }) {

  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgData, setImgData] = useState<string>(weblink.imgData ? "data:image/jpeg;base64," + weblink.imgData : "")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const baseURL = reader.result as string;
        setImgData(baseURL)
        setImgFile(file)
      };
    }
  }

  const [, formAction, isPending] = useActionState(async () => {


    toast.success("Link editado")
    router.push("/admin/weblinks")

    return


  }, null)

  return (
    <>
      <form action={formAction} className="flex flex-col gap-10 weblink-edit">

        <p className="text-xl font-bold tracking-wide py-4 my-4 border-b border-foreground25 w-full">{weblink._id ? "Editar" : "Crear"} link :</p>

        <div className="w-full flex items-center justify-center gap-4">

          <div className="flex flex-col gap-2 h-max">
            {
              imgData
                ? <AdminWeblinkEditFormModal imgData={imgData} imgFileName={imgFile?.name ?? "image"} />
                : <div className="w-[160px] h-[100px] bg-slate-300 rounded-lg shadow border border-black25 overflow-hidden p-2"></div>
            }

            <label className="btn-main size-5 flex justify-center items-center gap-2 w-full" htmlFor="file">
              <UploadSVG className="size-5 text-inherit" currentColor="currentColor" />
              imagen
            </label>
            <input ref={inputRef} className={"hidden"} type="file" name="image" id="file" accept=".jpeg, .png, .jpg, .webp"
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col justify-between items-start text-center gap-1">
            <label htmlFor="_id">titulo</label>
            <input className="input-main w-full text-center" type="text" name="_id" id="_id" defaultValue={weblink._id} required />
            <label htmlFor="href">href</label>
            <input className="input-main w-full text-center" type="text" name="href" id="href" defaultValue={weblink.href} required />
            <input className="hidden" type="text" name="imgData" id="imgData" defaultValue={imgData} />
          </div>


        </div>

        <div className="w-full flex flex-col justify-end items-end gap-2">
          <div className="w-full sm:w-1/2 flex gap-2">
            <SubmitBtn text={"Upload"} isPending={isPending} className="size-11 flex-1" />
            <Link className="btn-main-error flex-1" href={"/admin/weblinks"} >Cancelar</Link>
          </div>

        </div>

      </form>

    </>
  )
}