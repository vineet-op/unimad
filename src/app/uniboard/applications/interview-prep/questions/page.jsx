// app/interview-prep/questions.jsx
"use client";

import React, { useState } from "react";
import { useInterview } from "../../../../context/InterviewContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const QuestionsPage = () => {
    const router = useRouter();
    const { questions, setUserAnswers, userAnswers, setSampleAnswers } = useInterview();


    const cleanQuestion = (question) => {
        return question.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "");
    };


    const cleanedQuestions = questions.slice(1).map(cleanQuestion);

    const [currentStep, setCurrentStep] = useState(0);
    const [answer, setAnswer] = useState("");

    // Handle Next button click
    const handleNext = async () => {
        // Save the user's answer
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentStep] = answer;
        setUserAnswers(updatedAnswers);

        // Move to the next question or redirect to review page
        if (currentStep < cleanedQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
            setAnswer("");
        } else {
            const response = await fetch("http://localhost:3000/api/aianswers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ questions, userAnswers }),
            });
            const data = await response.json();
            setSampleAnswers(data.sampleAnswers);
            router.push("/reviews");
        }
    };

    // Handle Skip button click
    const handleSkip = () => {
        // Save an empty answer for skipped questions
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentStep] = "";
        setUserAnswers(updatedAnswers);

        // Move to the next question or redirect to review page
        if (currentStep < cleanedQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
            setAnswer(""); // Clear the input for the next question
        } else {
            router.push("/reviews"); // Redirect to the review page
        }
    };

    const progress = ((currentStep + 1) / cleanedQuestions.length) * 100;

    console.log(questions);
    console.log(answer);


    return (
        <div className="p-4 max-w-2xl mx-auto">
            {cleanedQuestions.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
                    <button
                        className="absolute left-80 text-blue-600 rounded-md bg-blue-300 px-4 py-2 font-bold"
                        onClick={() => router.back()} // Go back to the previous page
                    >
                        Back
                    </button>

                    {/* Current Question */}
                    <div className="mb-6 p-5 w-full">
                        <p className="text-lg font-semibold text-neutral-500">
                            Question {currentStep + 1} of {cleanedQuestions.length}:
                        </p>
                        <p className=" w-full text-lg font-semibold mt-2 text-neutral-500">{cleanedQuestions[currentStep]}</p>
                    </div>

                    {/* TextArea for User Answer */}
                    <div className="w-full flex-col bg-blue-300 rounded-md flex text-center justify-center text-blue-600">
                        <div className="p-2 font-semibold">Your Answer</div>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={4}
                            placeholder="Your answer..."
                            className="h-48 mt bg-neutral-100 w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-3 mt-5">
                        <button
                            onClick={handleSkip}
                            disabled={currentStep === cleanedQuestions.length - 1}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Skip
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {currentStep === cleanedQuestions.length - 1 ? "Finish" : "Next"}
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 mt-8">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionsPage;