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
            <div className="flex flex-col w-full h-screen">

                <div className="relative w-full h-[120px] overflow-hidden">

                    <div
                        className="absolute bg-blue-600 rounded-[50%]"
                        style={{
                            width: "532px",
                            height: "246px",
                            top: "-172px",
                            left: "-120px",
                        }}
                    >
                        {/* Logo positioned within the visible part of the eclipse */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                            <Image src="/mainlogo.png" alt="unimad logo" width={120} height={40} />
                        </div>
                    </div>
                </div>

                {/* Profile section */}
                <div className="flex flex-row gap-2 w-full items-center justify-between px-6 mt-6">
                    <div className="flex items-center gap-2">
                        {/* Use the correct path for the profile image */}
                        <Image src="/tanya.png" alt="profile picture" width={25} height={25} className="rounded-full" />
                        <div className="text-blue-500 font-semibold">Tanya Fernandez</div>
                    </div>
                    <EllipsisVertical size={20} className="text-gray-400" />
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
