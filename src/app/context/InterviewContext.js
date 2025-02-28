// context/InterviewContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); // Store user answers
    const [sampleAnswers, setSampleAnswers] = useState([]); // Store AI-generated sample answers

    return (
        <InterviewContext.Provider value={{
            questions, setQuestions, userAnswers,
            setUserAnswers,
            sampleAnswers,
            setSampleAnswers,
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);
