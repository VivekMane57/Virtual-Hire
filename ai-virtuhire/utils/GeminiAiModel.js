// utils/GeminiAiModel.js
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("⚠ NEXT_PUBLIC_GEMINI_API_KEY is missing. Gemini features are disabled.");
}

const MODEL_NAME = "gemini-flash-latest";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Small helper so we throw a clear error if API key is missing
function ensureClient() {
  if (!ai) {
    throw new Error("Gemini client is not initialized. Check NEXT_PUBLIC_GEMINI_API_KEY.");
  }
}

/**
 * Generic helper used for ATS + any other prompts.
 */
export async function generateAtsFeedback(prompt) {
  ensureClient();

  const contents = [{ role: "user", parts: [{ text: prompt }] }];

  const stream = await ai.models.generateContentStream({
    model: MODEL_NAME,
    contents,
  });

  let fullText = "";
  for await (const chunk of stream) {
    if (chunk.text) fullText += chunk.text;
  }
  return fullText;
}

/**
 * ✅ New helper exported for AddNewInterview.jsx
 * Used like: generateInterviewQuestions(jobRole)
 */
export async function generateInterviewQuestions(jobRole, count = 5) {
  const prompt = `
You are an expert interviewer.
Generate ${count} concise, role-specific interview questions for the role: "${jobRole}".

Return questions as a plain numbered list.
  `.trim();

  const text = await generateAtsFeedback(prompt);
  return text;
}

/**
 * Backwards-compatible wrapper for old code using chatSession.sendMessage
 */
export const chatSession = {
  async sendMessage(prompt) {
    const text = await generateAtsFeedback(prompt);
    return {
      response: {
        text: () => text,
      },
    };
  },
};
