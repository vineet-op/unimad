// context/InterviewContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);

    return (
        <InterviewContext.Provider value={{ questions, setQuestions }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => useContext(InterviewContext);
