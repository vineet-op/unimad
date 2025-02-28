// app/interview-prep/questions.jsx
"use client";

import React, { useState } from "react";
import { useInterview } from "../../../../context/InterviewContext";
import { useRouter } from "next/navigation";

const QuestionsPage = () => {


    const router = useRouter()

    const { questions, setUserAnswers, userAnswers } = useInterview();
    const [currentStep, setCurrentStep] = useState(0);
    const [answer, setAnswer] = useState("");

    // Handle Next button click
    const handleNext = () => {

        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentStep] = answer;
        setUserAnswers(updatedAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setAnswer("")
        } else {
            router.push('/reviews')
        }


    };

    // Handle Skip button click
    const handleSkip = () => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentStep] = "";
        setUserAnswers(updatedAnswers);

        if (currentStep < questions.length - 2) {
            setCurrentStep(currentStep - 1);
            setAnswer("");
        }
    };

    // Calculate progress percentage
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            {
                questions &&
                <>
                    <h2 className="text-2xl  font-bold mb-4">Interview Questions</h2>
                    <button className=" absolute left-80 text-blue-600 rounded-md bg-blue-300 px-4 py-2 font-bold">Back</button>
                    {/* Current Question */}
                    <div className="mb-6">
                        <p className="text-lg font-semibold">
                            Question {currentStep + 1} of {questions.length}:
                        </p>
                        <p className="text-lg mt-2">{questions[currentStep]}</p>
                    </div>


                    {/* //TextArea */}
                    <div className="w-full flex-col bg-blue-300  rounded-md flex text-center justify-center text-blue-600 ">
                        <div className="p-2 font-semibold">
                            Your Answers
                        </div>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4}
                            placeholder="Your answer..." className="h-48 mt bg-neutral-100 w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-3 mt-5">
                        <button
                            onClick={handleSkip}
                            disabled={currentStep === questions.length - 1}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentStep === questions.length - 1}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentStep === questions.length - 1 ? "Finish" : "Next"}
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
            }
        </div>
    );
};

export default QuestionsPage;
