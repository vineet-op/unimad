"use client";

import React, { useState } from "react";
import InterviewModal from "../../../components/InterviewModal";
import { Plus } from "lucide-react";

const Interviewpage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    // Debugging line to check state updates
    console.log("Current Data:", data);

    return (
        <div className="w-full h-screen bg-neutral-100 pt-16 pl-10">
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

                {/* Render list of all data */}
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="flex  w-[356px] h-[73px] justify-between items-center bg-white shadow-md rounded-lg p-4"
                        >
                            <div>
                                <div className="font-semibold text-lg">{item.role}</div>
                                <div className="text-gray-500">{item.company}</div>
                            </div>
                            <button className="bg-blue-600 text-white px-2 py-1 font-normal text-sm rounded-lg">
                                Restart
                            </button>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
            <InterviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setData={setData} // Correctly passing setData as a prop
            />
        </div>
    );
};

export default Interviewpage;
