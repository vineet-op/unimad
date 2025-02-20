"use client"

import React, { useState } from 'react'
import InterviewModal from '../../../components/InterviewModal'
import { Plus } from 'lucide-react'

const Interviewpage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='w-full h-screen bg-neutral-100 pt-16 pl-10'>
            <div className="text-blue-500 font-semibold text-xl pb-16">
                Interview Prep
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-center justify-center bg-blue-200 text-blue-800 px-4 py-2 rounded-md w-[356px] h-[73px]"
                >
                    <Plus />
                    Start new interview
                </button>

                <InterviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    )
}

export default Interviewpage
