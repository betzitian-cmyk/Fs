import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateImage = async (
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1",
  retries = 3
) => {
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return null;
  }

  let delay = 2000; // Start with 2s delay

  for (let i = 0; i <= retries; i++) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio,
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error: any) {
      const isQuotaError = error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED";
      
      if (isQuotaError && i < retries) {
        console.warn(`Quota exceeded. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
        await sleep(delay);
        delay *= 2; // Exponential backoff
        continue;
      }

      console.error("Error generating image:", error);
      return null;
    }
  }
  return null;
};
