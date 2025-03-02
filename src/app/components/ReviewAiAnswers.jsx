import React from 'react'

const ReviewAiAnswers = () => {
    return (
        <div className='w-[610px] bg-blue-50 h-96 m-8 mb-4 rounded-md'>
            <div className='flex flex-col gap-4'>
                <div className='text-gray-500 text-center pt-4'>
                    Recommended Answers
                </div>
                <div className='text-center p-4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dicta harum id temporibus delectus consequuntur recusandae voluptatum assumenda explicabo inventore. Alias necessitatibus quas est saepe praesentium, quasi itaque natus minima fugit eligendi quia laboriosam facilis nostrum hic, tenetur libero! Enim repellendus quasi itaque neque voluptatibus a quae fuga mollitia veniam!
                </div>
                <div className='mx-auto'>
                    <button className='bg-blue-500 p-2 rounded-md text-white mt-8 px-8'>
                        Generate
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewAiAnswers