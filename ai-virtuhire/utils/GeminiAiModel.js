// utils/GeminiAiModel.js
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is missing");
}

const MODEL_NAME = "gemini-flash-latest";
const ai = new GoogleGenAI({ apiKey });

export async function generateAtsFeedback(prompt) {
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

// simple compat wrapper for old code using `chatSession.sendMessage`
export const chatSession = {
  async sendMessage(prompt) {
    const text = await generateAtsFeedback(prompt);
    return {
      response: { text: () => text },
    };
  },
};
