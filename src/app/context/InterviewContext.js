"use client";

import React, { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); // Store user answers
    const [sampleAnswers, setSampleAnswers] = useState([]); // Store AI-generated sample answers
    const [loading, setLoading] = useState(false);



    const generateAllSampleAnswers = async (questionsToProcess) => {
        setLoading(true);
        try {
            const response = await fetch("/api/aianswers/bulk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ questions: questionsToProcess }),
            });

            if (!response.ok) throw new Error("Failed to generate answers");

            const data = await response.json();
            const validAnswers = data.sampleAnswers.slice(1);
            setSampleAnswers(validAnswers);
        } catch (error) {
            console.error("Error generating answers:", error);
        } finally {
            setLoading(false);
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
            generateAllSampleAnswers,
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);