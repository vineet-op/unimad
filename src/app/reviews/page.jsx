"use client";

import { useInterview } from "../context/InterviewContext";
import ReviewAiAnswers from "../components/ReviewAiAnswers";
import ReviewAnswer from "../components/ReviewAnswer";
import { useState, useEffect } from "react";

const Page = () => {
    const { questions, userAnswers, sampleAnswers, loading, generateAllSampleAnswers } = useInterview();

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    useEffect(() => {
        if (questions.length > 0) {
            const processedQuestions = questions.slice(1).map(q =>
                q.replace(/^[^\w]+|[^\w]+$/g, '')
                    .replace(/[^a-zA-Z\s]/g, '')
            );
            generateAllSampleAnswers(processedQuestions);
        }
    }, [questions]);

    const handleQuestionClick = (index) => {
        setActiveQuestionIndex(index === activeQuestionIndex ? null : index);
    };




    return (
        <div className="max-w-full flex justify-around bg-neutral-100">
            {/* User Answers Section */}
            <div className="mb-8 p-8 bg-white flex items-center flex-col overflow-y-visible" style={{ width: '70%' }}>
                {loading && <p className="text-gray-500 mb-4">Generating sample answers...</p>}
                {questions.slice(1).map((question, index) => (
                    <ReviewAnswer
                        key={index}
                        question={question}
                        answer={userAnswers[index] || "No answer provided."}
                        category="Technical"
                        onClick={() => handleQuestionClick(index)}
                        isActive={index === activeQuestionIndex}
                    />
                ))}
            </div>

            {/* AI Answers Section */}
            <div style={{ width: '50%' }} className="bg-white pr-5 overflow-hidden">
                {activeQuestionIndex !== null && sampleAnswers[activeQuestionIndex] && (
                    <ReviewAiAnswers
                        answer={sampleAnswers[activeQuestionIndex]}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
