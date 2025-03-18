"use client";

import { useRouter } from "next/navigation";
import { useInterview } from "../context/InterviewContext";
import ReviewAiAnswers from "../components/ReviewAiAnswers";
import ReviewAnswer from "../components/ReviewAnswer";
import { useState, useEffect } from "react";
import { ChevronLeft, Repeat } from "lucide-react";

const Page = () => {
    const router = useRouter();
    const { questions, userAnswers, sampleAnswers, loading, generateAllSampleAnswers, usercompany, userrole } = useInterview();

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
        <div>
            <button
                className="flex left-80 text-blue-600 rounded-md mt-4 ml-8 bg-blue-300 px-3 py-2 font-bold"
                onClick={() => router.push("/uniboard/applications/interview-prep")}
            >
                <ChevronLeft size={25} />
                Back
            </button>

            <div className="bg-white w-[655px] ml-8 mt-5 h-20 flex justify-between border-2 border-blue-400 rounded-lg items-center">
                <div className="p-5">
                    <div className="font-semibold">
                        {usercompany}
                    </div>
                    <div className="font-normal text-neutral-600">
                        {userrole}
                    </div>
                </div>
                <div className="p-5">
                    <button className="bg-blue-500 text-white px-4 py-1 flex gap-2 justify-center items-center rounded-md">
                        <Repeat size={15} />
                        Retake</button>
                </div>
            </div>

            {/* User Answers Section */}
            <div className="max-w-full flex justify-around bg-neutral-100">
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
        </div>
    );
};

export default Page;
