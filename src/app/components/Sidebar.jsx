"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import mainlogo from "../../../public/mainlogo.png"
import tanya from "../../../public/tanya.png"
import { EllipsisVertical, Play } from 'lucide-react'


const Sidebar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [menuOpen2, setMenuOpen2] = useState(false)

    return (
        <div className='w-[289px] bg-white shadow-xl'>
            {/* //LOGO */}
            <div className='flex flex-col  w-full h-screen'>
                <div className='w-full h-[106px] flex items-center  justify-center relative  bg-blue-600 rounded-b-full'>
                    <Image src={mainlogo} alt='mainlogo' className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                </div>

                <div className='flex flex-row gap-2 w-full items-center justify-around pt-10 pl-6'>
                    <Image src={tanya} alt='tanyalogo' width={25} height={25} />
                    <div className='text-blue-500 text-center font-semibold'>
                        Tanya Feranandez
                    </div>
                    <EllipsisVertical size={20} />
                </div>
                <hr className='border-t border-gray-400 my-8' />

                <div className='mx-4'>
                    <div className='text-gray-600 font-normal'>
                        <div className='py-2 cursor-pointer'>Home</div>
                        <div className='py-2 cursor-pointer'>My Resume</div>
                        <div className='py-2 cursor-pointer flex items-center justify-between' onClick={() => { setMenuOpen(!menuOpen) }}>
                            <span>Linkedin Optimization</span>
                            <Play className='fill-gray-600 size-3' />
                        </div>
                        {menuOpen ? (
                            <div className='py-2 ml-10 cursor-pointer'>Menu Content</div>
                        ) : null}
                        <div className='py-2 cursor-pointer'>Portfolio</div>

                        <div className='py-2 cursor-pointer flex items-center justify-between' onClick={() => { setMenuOpen2(!menuOpen2) }}>
                            <div>Applications</div>
                            <Play className='fill-gray-600 size-3' />
                        </div>
                        {menuOpen2 ? (
                            <div className='py-2 ml-10 cursor-pointer'>Interview Prep</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
