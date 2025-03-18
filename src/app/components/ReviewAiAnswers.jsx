import React from 'react';
import Image from 'next/image';
import { useInterview } from '../context/InterviewContext';

const ReviewAiAnswers = ({ answer, questionIndex }) => {
    const { regenerateSingleAnswer, loading } = useInterview();

    const handleRegenerateAnswer = () => {
        regenerateSingleAnswer(questionIndex);
    };

    return (
        <div className="border-2 border-blue-400 rounded-lg p-4 max-w-2xl mt-8">
            <div className="mb-2">
                <h3 className="text-gray-600 font-normal text-center">Recommended Answer</h3>
            </div>
            <div className="mt-4 mb-6">
                <p className="text-gray-800 whitespace-pre-line">{answer.replace(/[^a-zA-Z\s]/g, '')}</p>
            </div>
            <div className="mt-5 flex justify-center">
                <button
                    onClick={handleRegenerateAnswer}
                    disabled={loading}
                    className={`bg-blue-600 font-medium flex justify-center items-center gap-2 text-white w-fit h-10 px-5 text-center rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Image src="/grad.png" alt='gradimage' width={20} height={25} />
                    {loading ? 'Generating...' : 'Generate another'}
                </button>
            </div>
        </div>
    );
};

export default ReviewAiAnswers;