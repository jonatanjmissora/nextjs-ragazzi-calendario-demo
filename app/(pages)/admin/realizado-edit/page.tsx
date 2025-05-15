import RealizadoEditFormContainer from '@/app/_components/Dashboard/03_Admin_Realizados/Admin_Realizado_EditForm_Container'
import SkeltonDesktopEditForm from '@/app/_components/Skeltons/Desktop/Skelton_Desktop_Edit_Form'
import { Suspense } from 'react'

export default async function RealizadosEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""

  return (
    <section className="page justify-center items-center">

      <Suspense key={Math.random()} fallback={<SkeltonDesktopEditForm pagoType={"realizado"} />}>
        <RealizadoEditFormContainer id={id} />
      </Suspense>

    </section>
  )
}
