"use client";

import { useInterview } from "../context/InterviewContext";
import ReviewAiAnswers from "../components/ReviewAiAnswers";
import ReviewAnswer from "../components/ReviewAnswer";
import { useState } from "react";

const Page = () => {
    const { questions, userAnswers, sampleAnswers = [] } = useInterview();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const actualQuestion = questions.slice(1).map(question => question
        .replace(/^[^\w]+|[^\w]+$/g, '')
        .replace(/[^a-zA-Z\s]/g, ''));


    // Handle question click
    const handleQuestionClick = (index) => {
        setActiveQuestionIndex(index === activeQuestionIndex ? null : index); // Toggle active question
    };



    return (
        <div className="max-w-full flex justify-around bg-neutral-100">
            {/* User Answers Section */}
            <div className="mb-8 p-8 bg-white flex items-center flex-col overflow-y-visible" style={{ width: '70%' }}>

                {actualQuestion.map((question, index) => (
                    <ReviewAnswer
                        key={index}
                        question={question}
                        answer={userAnswers[index] || "No answer provided."}
                        category="Technical"
                        onClick={() => handleQuestionClick(index)} // Handle question click
                        isActive={index === activeQuestionIndex} // Highlight
                    />

                ))}
            </div>

            {/* AI Answers Section */}
            <div style={{ width: '50%' }} className="bg-white pr-5 overflow-hidden">
                {activeQuestionIndex !== null && (
                    <ReviewAiAnswers
                        question={actualQuestion[activeQuestionIndex]}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
