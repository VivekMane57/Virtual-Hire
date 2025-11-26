// utils/GeminiAiModel.js
import { GoogleGenAI } from "@google/genai";

const apiKey =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Gemini API key missing. Set NEXT_PUBLIC_GEMINI_API_KEY or GEMINI_API_KEY."
  );
}

const MODEL_NAME = "gemini-1.5-flash"; // or your preferred model
const client = new GoogleGenAI({ apiKey });

/** Low-level helper: call Gemini and return full text */
async function callGemini(prompt) {
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const stream = await client.models.generateContentStream({
    model: MODEL_NAME,
    contents,
  });

  let fullText = "";
  for await (const chunk of stream) {
    if (chunk.text) fullText += chunk.text;
  }
  return fullText;
}

/** Used for mock interview question generation */
export async function generateInterviewQuestions(prompt) {
  return callGemini(prompt);
}

/** Used for ATS resume feedback */
export async function generateAtsFeedback(prompt) {
  return callGemini(prompt);
}

/**
 * Compat object so old code using `chatSession.sendMessage(prompt)`
 * still works.
 */
export const chatSession = {
  async sendMessage(prompt) {
    const text = await callGemini(prompt);
    return {
      response: {
        text() {
          return text;
        },
      },
    };
  },
};
