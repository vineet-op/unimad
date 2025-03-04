import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req) => {
    try {
        const { questions } = await req.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const answers = await Promise.all(questions.map(async (question) => {
            const prompt = `Generate a sample answer for: ${question}\n\nProvide a concise, professional answer only return answers.`;
            const result = await model.generateContent(prompt);
            return result.response.text();
        }));

        return NextResponse.json({ sampleAnswers: answers });
    } catch (error) {
        console.log("Error generating answers:", error);
        return NextResponse.json({ error: "Failed to generate answers" }, { status: 500 });
    }
};