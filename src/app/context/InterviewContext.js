"use client";

import React, { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); // Store user answers
    const [sampleAnswers, setSampleAnswers] = useState([]); // Store AI-generated sample answers
    const [loading, setLoading] = useState(false);
    const [usercompany, setUserCompany] = useState(""); // 
    const [userrole, setuserRole] = useState(""); // 


    const generateAllSampleAnswers = async (questionsToProcess) => {
        setLoading(true);
        try {
            const response = await fetch("/api/aianswers", {
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

    const regenerateSingleAnswer = async (questionIndex) => {
        setLoading(true);
        try {
            const response = await fetch("/api/aianswers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questions: [questions[questionIndex]],
                    regenerate: true
                }),
            });

            if (!response.ok) throw new Error("Failed to regenerate answer");

            const data = await response.json();
            const newAnswer = data.sampleAnswers[0];

            // Create a new array with the regenerated answer
            const updatedSampleAnswers = [...sampleAnswers];
            updatedSampleAnswers[questionIndex] = newAnswer;
            setSampleAnswers(updatedSampleAnswers);
        } catch (error) {
            console.error("Error regenerating answer:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <InterviewContext.Provider value={{
            usercompany,
            setUserCompany,
            userrole,
            setuserRole,
            questions,
            setQuestions,
            userAnswers,
            setUserAnswers,
            sampleAnswers,
            setSampleAnswers,
            generateAllSampleAnswers,
            regenerateSingleAnswer,
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);