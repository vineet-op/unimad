import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req) => {
    try {
        const { question } = await req.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate a sample answer for the following interview question:\n\nQuestion: ${question}\n\nProvide a concise and professional sample answer.`;
        const result = await model.generateContent(prompt);
        const sampleAnswer = result.response.text();

        return NextResponse.json({ sampleAnswer });
    } catch (error) {
        console.log("Error generating sample answers:", error);
        return NextResponse.json({ error: "Failed to generate sample answers" }, { status: 500 });
    }
};