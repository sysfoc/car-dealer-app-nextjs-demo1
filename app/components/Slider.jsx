import React from 'react'
import { Carousel } from "flowbite-react";
import Image from 'next/image';


const Slider = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-3">
      <Carousel slideInterval={3000}>
        <Image src={'/Luxury SUV.jpg'} alt="..." width={700} height={500} className='w-auto h-auto'/>
        <Image src={'/Luxury SUV.jpg'} alt="..." width={700} height={500} className='w-auto h-auto'/>
        <Image src={'/Luxury SUV.jpg'} alt="..." width={700} height={500} className='w-auto h-auto'/>
        <Image src={'/Luxury SUV.jpg'} alt="..." width={700} height={500} className='w-auto h-auto'/>
        <Image src={'/Luxury SUV.jpg'} alt="..." width={700} height={500} className='w-auto h-auto'/>
      </Carousel>
    </div>
  )
}

export default Slider