// context/InterviewContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); // Store user answers
    const [sampleAnswers, setSampleAnswers] = useState({}); // Store AI-generated sample answers

    // Function to generate a sample answer for a specific question
    const generateSampleAnswer = async (question) => {
        try {
            const response = await fetch("/api/generate-sample-answers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate sample answer");
            }

            const data = await response.json();
            return data.sampleAnswer; // Return the generated sample answer
        } catch (error) {
            console.error("Error generating sample answer:", error);
            return null;
        }
    };

    return (
        <InterviewContext.Provider value={{
            questions,
            setQuestions,
            userAnswers,
            setUserAnswers,
            sampleAnswers,
            setSampleAnswers,
            generateSampleAnswer, // Provide the function
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);
