import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import React from 'react'
import { DarkThemeToggle } from "flowbite-react";
import Image from 'next/image';

const Header = () => {
  return (
        <Navbar fluid className='shadow-md'>
            <NavbarBrand href="#">
             <Image src={"/logo.png"} alt="Sysfoc-cars-dealer" width={100} height={50} className='w-auto h-auto object-cover'/>
          </NavbarBrand>
          <div className='flex items-center gap-5'>
            <DarkThemeToggle className='md:hidden'/>
            <NavbarToggle/>
          </div>
          <NavbarCollapse>
              <NavbarLink href="#" active className='bg-blue-950 text-white dark:text-white md:bg-transparent md:text-blue-950'>
                Home
              </NavbarLink>
              <NavbarLink href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car for Sale</NavbarLink>
              <NavbarLink href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Sell or Trade</NavbarLink>
              <NavbarLink href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Car Finance</NavbarLink>
              <NavbarLink href="#" className='hover:text-blue-950 md:hover:text-blue-950'>About Us</NavbarLink>
              <NavbarLink href="#" className='hover:text-blue-950 md:hover:text-blue-950'>Contact Us</NavbarLink>
          </NavbarCollapse>
          <DarkThemeToggle className='hidden md:block'/>
        </Navbar>
  )
}

export default Header