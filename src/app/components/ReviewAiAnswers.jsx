import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';


const ReviewAiAnswers = ({ question }) => {

    const { sampleAnswers, setSampleAnswers, generateSampleAnswer } = useInterview();
    const [isLoading, setIsLoading] = useState(false);

    const currentSampleAnswer = sampleAnswers[question] || "No sample answer available.";

    const handleGenerate = async () => {
        setIsLoading(true);
        const newSampleAnswer = await generateSampleAnswer(question);
        if (newSampleAnswer) {
            // Update the sample answer for the current question
            setSampleAnswers((prev) => ({
                ...prev,
                [question]: newSampleAnswer,
            }));
        }
        setIsLoading(false);
    };




    return (

        <div className="border border-blue-300 rounded-lg p-4 max-w-2xl">
            <div className="mb-2">
                <h3 className="text-gray-600 font-normal text-center">Recommended Answer</h3>
            </div>
            <div className="mt-4 mb-6">
                <p className="text-gray-800 whitespace-pre-line">{currentSampleAnswer}</p>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-200 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {isLoading ? "Generating..." : "Generate another"}
                </button>
            </div>
        </div>
    );
};

export default ReviewAiAnswers;