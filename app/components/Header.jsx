import { Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import React from 'react'
import { DarkThemeToggle } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
        <Navbar fluid className='shadow-md'>
            <Link href="/">
             <Image src={"/logo.png"} priority alt="Sysfoc-cars-dealer" width={100} height={50} className='w-auto h-auto object-cover'/>
          </Link>
          <div className='flex md:hidden items-center gap-5'>
            <RiAccountCircleFill fontSize={22} className='text-gray-700'/>
            <DarkThemeToggle/>
            <NavbarToggle/>
          </div>
          <NavbarCollapse>
              <NavbarLink as={'div'} active className='bg-blue-950 text-white dark:text-white md:bg-transparent md:text-blue-950'><Link href="/">
                Home
              </Link></NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="#">Used Cars</Link>
              </NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>New Cars</Link></NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="/car-for-sale" className='hover:text-blue-950 md:hover:text-blue-950'>Sell or Trade</Link> </NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Value Your Car</Link> </NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car Leasing</Link> </NavbarLink>
              <NavbarLink as={'div'} className='hover:text-blue-950 md:hover:text-blue-950'><Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car Finance</Link> </NavbarLink>
          </NavbarCollapse>
          <div className='hidden md:flex items-center gap-x-5'>
            <RiAccountCircleFill fontSize={20} className='text-gray-700'/>
            <FaRegHeart fontSize={16} className='text-gray-700'/>
            <DarkThemeToggle/>
          </div>
        </Navbar>
  )
}

export default Header