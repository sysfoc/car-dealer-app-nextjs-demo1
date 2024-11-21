import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import React from 'react'
import { DarkThemeToggle } from "flowbite-react";
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
        <Navbar fluid className='shadow-md'>
            <Link href="/">
             <Image src={"/logo.png"} alt="Sysfoc-cars-dealer" width={100} height={50} className='w-auto h-auto object-cover'/>
          </Link>
          <div className='flex items-center gap-5'>
            <DarkThemeToggle className='md:hidden'/>
            <NavbarToggle/>
          </div>
          <NavbarCollapse>
              <Link href="/" active className='bg-blue-950 text-white dark:text-white md:bg-transparent md:text-blue-950'>
                Home
              </Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Used Cars</Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>New Cars</Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Sell or Trade</Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Value Your Car</Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car Leasing</Link>
              <Link href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car Finance</Link>
          </NavbarCollapse>
          <DarkThemeToggle className='hidden md:block'/>
        </Navbar>
  )
}

export default Header