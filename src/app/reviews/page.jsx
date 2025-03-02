import React from 'react';
import ReviewAnswer from '../components/ReviewAnswer';
import ReviewAiAnswers from '../components/ReviewAiAnswers';

const Page = () => {
    return (
        <div className="w-full h-screen  flex text-gray-700">

            <div className="w-full h-full flex">
                {/* 70% width div */}
                <div className="w-[70%] bg-neutral-100 flex items-center justify-center">
                    <ReviewAnswer />
                </div>

                {/* 30% width div */}
                <div className="w-[40%] bg-red-500 h-screen flex items-center justify-center">
                    <ReviewAiAnswers />
                </div>
            </div>

        </div>
    );
};

export default Page;
