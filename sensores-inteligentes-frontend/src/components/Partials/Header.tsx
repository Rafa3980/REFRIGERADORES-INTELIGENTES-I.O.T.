/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import Cookies from 'js-cookie'
export default function Header() {
  const router = useRouter()

  function removeToken() {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <div className="sticky top-0 z-[99]">
      <header className="bg-primary-500 bg-gradient-to-r from-yellow-200 to-yellow-500 text-center py-4 flex justify-center items-center px-5 shadow border-b-2 border-black relative">
        {router.pathname !== '/dashboard' ? (
          <Link href="/dashboard">
            <Icon
              icon="ri:arrow-left-s-line"
              className="text-black text-3xl absolute left-4"
            />
          </Link>
        ) : null}

        <img src="/logo.png" alt="segtron" className="w-36" />
        <Icon
          icon="ri:logout-circle-r-line"
          className="text-black text-3xl absolute right-4"
          onClick={removeToken}
        />
      </header>
    </div>
  )
}
