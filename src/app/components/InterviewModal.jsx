"use client"

import { X } from "lucide-react"
import { useState } from "react"

function InterviewModal({ isOpen, onClose }) {
    const [selectedType, setSelectedType] = useState("")

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-xl relative animate-in ease-in zoom-in duration-400">
                {/* Close button */}
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                </button>

                {/* Modal content */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-center text-blue-600 mb-6">Interview Prep</h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Company</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Job Description</label>
                            <textarea className="w-full px-3 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Round</label>
                            <div className="flex gap-2">
                                {["Behavioral", "Technical", "Screening Call"].map((type, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedType(`type${index + 1}`)}
                                        className={`px-4 py-1.5 rounded-md text-sm ${selectedType === `type${index + 1}` || (selectedType === "" && type === "Behavioral")
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors mt-6">
                            Start Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewModal

