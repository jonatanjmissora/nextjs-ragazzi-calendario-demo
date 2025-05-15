import PlusSVG from '@/app/_assets/PlusSVG'
import React from 'react'
import SkeltonInput from './Skelton_Input'

export default function SkeltonAdminWeblinks() {
  return (
    <>

      <div className="w-full px-3">
        <div className="flex justify-between items-center w-full font-semibold tracking-wide border-b border-foreground25 py-4">
          <span className="text-xl w-full">Links</span>
          <div>
            <PlusSVG className="size-5 text-foreground hover:text-foreground80" currentColor="currentColor" />
          </div>
        </div>

        {[0, 1, 2, 3, 4].map((_, index) => <WeblinkRow key={index} />)}
      </div>

    </>
  )
}

const WeblinkRow = () => {

  return (
    <article className="flex justify-between items-center border-b border-foreground25 last:border-b-0 py-4">
      <div className="w-[100px] h-[80px] weblink-img bg-foreground80 animate-pulse rounded-lg shadow border border-black25 overflow-hidden p-2 relative">
      </div>
      <SkeltonInput className='h-6 w-32 sm:w-[25rem]' />
      <SkeltonInput className='w-20 h-6' />
    </article>
  )
}