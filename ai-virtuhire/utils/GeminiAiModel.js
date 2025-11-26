// utils/GeminiAiModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Public key (for browser)
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "❌ ERROR: NEXT_PUBLIC_GEMINI_API_KEY is missing. Add it to `.env.local` and restart the app."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);
const MODEL_NAME = "gemini-1.5-flash";

/**
 * Generate Interview Questions (used by Start New Interview modal)
 */
export async function generateInterviewQuestions(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Interview Question Generation Error:", error);
    return "Error generating interview questions.";
  }
}

/**
 * ATS Resume Feedback (used by resume page)
 */
export async function generateAtsFeedback(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ ATS Feedback Error:", error);
    return "Error generating resume analysis.";
  }
}

// Optional simple alias
export async function askGemini(prompt) {
  return generateInterviewQuestions(prompt);
}
