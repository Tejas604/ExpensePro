"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid,PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
  const path = usePathname();
  useEffect (()=>{
    console.log(path)
  },[path])
  const menuList =[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutGrid,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Budgets',
      icon:PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id:3,
      name:'Expenses',
      icon:ReceiptText,
      path:'/dashboard/expenses'
    },
    {
      id:4,
      name:'upgrade',
      icon:ShieldCheck,
      path:'/dashboard/upgrade'
    },
  ]
  return (
    <div className='h-screen p-4 border shadow-sm'>
     <Image src ={'/logo.svg'}
     alt = 'logo'
     width={160}
     height={100}
     />
      <div className='mt-5'>
      {menuList.map((menu,index)=>(
        <Link href={menu.path}>
      <h2 className={` flex gap-2 items-center text-gray-400 font-medium 
      mb-2
      p-4 cursor-pointer rounded-md  hover:text-primary hover:bg-blue-100
    ${path==menu.path&&'text-primary bg-blue-100'}
      `}>
       <menu.icon/>
        {menu.name}
      </h2>
      </Link>
      ))}
      <div className=' fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton/> Profile
      </div>
    </div>
    </div> 
   
  )
}

export default SideNav
