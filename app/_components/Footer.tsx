import Image from 'next/image'
import React from 'react'
import { getCachedWeblinksAction } from '../_lib/actions/weblinks.action'
import { WeblinkType } from '../_lib/schema/weblink.type'
import WebSVG from '../_assets/WebSVG'
import Link from 'next/link'
import getUserFromCookie from '../_lib/utils/getUserFromCookies'

export default async function Footer() {

  const year = new Date().getFullYear()
  const weblinks = await getCachedWeblinksAction()
  const user = await getUserFromCookie()

  return (
    <footer className='text-foreground h-max py-4 sm:footer-height w-full flex gap-2 flex-col sm:flex-row justify-between items-center px-5 relative z-100'>

      {
        user &&
        <div className='flex gap-2 items-center w-8 overflow-hidden hover:w-[70%] sm:hover:w-[20rem]'>
          <span className='w-8'><WebSVG className='size-7 text-slate-500' currentColor={"currentColor"} /></span>
          {weblinks.map(weblink => <Weblink key={weblink._id} weblink={weblink} />)}
        </div>
      }

      <span className='text-bold text-yellow-600 tracking-wider'>⚠ Demo version</span>

      <span>K@to {year}</span>

    </footer>
  )
}

const Weblink = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <Link href={weblink.href} target="_blank" className="w-[8dvh] h-[4dvh] bg-slate-700/50 rounded-md overflow-hidden relative">
      <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-1" />
    </Link>
  )
}
