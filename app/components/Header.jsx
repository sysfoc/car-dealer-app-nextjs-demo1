import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import React from 'react'
import { DarkThemeToggle } from "flowbite-react";
import Image from 'next/image';

const Header = () => {
  return (
        <Navbar fluid className='shadow-md'>
            <NavbarBrand href="#">
             <Image src={"/logo.png"} width={100} height={50} className='object-cover'/>
          </NavbarBrand>
          <NavbarToggle/>
          <NavbarCollapse>
              <NavbarLink href="#" active className='bg-pink-500 text-white dark:text-white md:bg-transparent md:text-black'>
                Home
              </NavbarLink>
              <NavbarLink href="#" className='hover:text-pink-500 md:hover:text-pink-500'>Car for Sale</NavbarLink>
              <NavbarLink href="#" className='hover:text-pink-500 md:hover:text-pink-500'>Sell or Trade</NavbarLink>
              <NavbarLink href="#" className='hover:text-pink-500 md:hover:text-pink-500'>Car Finance</NavbarLink>
              <NavbarLink href="#" className='hover:text-pink-500 md:hover:text-pink-500'>About Us</NavbarLink>
              <NavbarLink href="#" className='hover:text-pink-500 md:hover:text-pink-500'>Contact Us</NavbarLink>
          </NavbarCollapse>
          <DarkThemeToggle className='hidden md:block'/>
        </Navbar>
  )
}

export default Header