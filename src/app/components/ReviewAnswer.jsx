import React from 'react';

const ReviewAnswer = ({ question, answer, category, onClick, isActive }) => {
    return (
        <div className={`border border-blue-300 rounded-lg p-4 max-w-2xl ${isActive ? "border-2 border-blue-500" : ""}`} onClick={onClick}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-600 font-normal">{question}</h3>
                {category && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">{category}</span>}
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Your Answer</p>
                <p className="text-gray-800 whitespace-pre-line">{answer}</p>
            </div>
        </div>
    );
};

export default ReviewAnswer;