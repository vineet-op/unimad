"use client";

import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { useInterview } from "../context/InterviewContext";
import { useRouter } from "next/navigation";

function InterviewModal({ isOpen, onClose, setData }) {

    const router = useRouter();

    const { setQuestions, usercompany, userrole, setUserCompany, setuserRole } = useInterview()

    const [selectedType, setSelectedType] = useState("Behavioral");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("")


    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            // Set context values before API call
            setuserRole(role);
            setUserCompany(company);

            const response = await axios.post("http://localhost:3000/api/companydata", {
                role,
                company,
            });

            // Debugging line to see the API response
            console.log("API Response:", response.data);

            // Append new data to the existing list
            setData((prevData) => [...prevData, response.data.data]);

            // Clear inputs and close the modal
            setRole("");
            setCompany("");
            setDescription("")
            setSelectedType("");
            router.push('interview-prep/questions');
        } catch (error) {
            console.error("Error in POST request:", error);
        }


        try {
            const geminiResponse = await axios.post("http://localhost:3000/api/getquestions", { selectedType })
            setQuestions(geminiResponse.data.questions)
        } catch (error) {
            console.error("Error while getting questions:", error);
        } finally {
            console.log("Error getting questions");
            // onClose();
        }

        console.log(selectedType);

    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-xl relative animate-in ease-in zoom-in duration-400">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-center text-blue-600 mb-6">
                        Interview Prep
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Role</label>
                                <input
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        setuserRole(e.target.value);
                                    }}
                                    type="text"
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Company</label>
                                <input
                                    value={company}
                                    onChange={(e) => {
                                        setCompany(e.target.value);
                                        setUserCompany(e.target.value);
                                    }}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className=" text-sm mb-1">Job Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    className="w-[530px] h-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Round</label>
                            <div className="flex gap-2">
                                {["Behavioral", "Technical", "Screening Call"].map(
                                    (type, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedType(type)}
                                            className={`px-4 py-1.5 rounded-md text-sm ${selectedType === type ||
                                                (selectedType === "" && type === "Behavioral")
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}

                            className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors mt-6"
                        >
                            Start Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterviewModal;
