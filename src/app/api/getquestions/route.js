import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req) => {
    try {
        const { selectedType } = await req.json();

        if (!selectedType) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate prompt based on the user's choice
        const prompt = `Generate 5 interview questions for a ${selectedType} round, simulating an interview for a tech company. The questions should be relevant to the chosen round and reflect the type of questions commonly asked in tech interviews.  
            - If 'Behavioral' is chosen, focus on assessing soft skills, teamwork, leadership, and problem-solving abilities.  
            - If 'Technical' is chosen, focus on coding challenges, algorithms, data structures, and system design questions.  
            - If 'Screening Call' is chosen, include general background questions, motivations, and an overview of technical skills.  
            Please provide the questions in a clear, numbered list format.`;

        // Generate questions
        const result = await model.generateContent(prompt);
        const questionsText = result.response.text();

        // Split the response into a list of questions
        const questionsArray = questionsText
            .split(/\n\d+\.\s/) // Split by newline followed by a number and a dot
            .filter(q => q.trim() !== '') // Remove empty strings
            .map((q, index) => `${index + 1}. ${q.trim()}`); // Re-add numbering for consistency

        // Return structured JSON response
        return NextResponse.json({
            success: true,
            questions: questionsArray,
        });

    } catch (error) {
        console.log("Error while getting questions", error);
        return NextResponse.json({
            success: false,
            error: 'Failed to generate questions'
        }, { status: 500 });
    }
};