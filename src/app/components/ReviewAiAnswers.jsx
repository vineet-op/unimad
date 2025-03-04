import React from 'react';

const ReviewAiAnswers = ({ answer }) => {
    return (
        <div className="border border-blue-300 rounded-lg p-4 max-w-2xl mt-8">
            <div className="mb-2">
                <h3 className="text-gray-600 font-normal text-center">Recommended Answer</h3>
            </div>
            <div className="mt-4 mb-6">
                <p className="text-gray-800 whitespace-pre-line">{answer.replace(/[^a-zA-Z\s]/g, '')}</p>
            </div>
        </div>
    );
};

export default ReviewAiAnswers;