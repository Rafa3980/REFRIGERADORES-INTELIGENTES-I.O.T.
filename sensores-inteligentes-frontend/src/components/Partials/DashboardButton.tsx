import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React from 'react'

interface DashboardButtonProps {
  icon: string
  title: string
  link: string
}

export default function DashboardButton({
  icon,
  link,
  title,
}: DashboardButtonProps) {
  const router = useRouter()
  return (
    <div
      className="w-full aspect-square bg-gradient-to-r from-slate-700 to-black rounded-md shadow flex justify-center items-center flex-col hover:scale-95 transition-all cursor-pointer p-3"
      onClick={() => router.push(link)}
    >
      <Icon icon={icon} className="text-5xl text-white" />
      <span className="text-white font-bold text-xl mt-3 text-center">
        {title}
      </span>
    </div>
  )
}
