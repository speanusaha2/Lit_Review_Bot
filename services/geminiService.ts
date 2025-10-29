
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePaper = async (
  source: { text?: string; file?: { data: string; mimeType: string } },
  userQuestion: string
): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const systemInstruction = "You are an expert research assistant specializing in scientific literature analysis. Based *only* on the content of the research paper provided, please answer the user's question. Provide a concise and structured answer. If the question asks for a list, format it clearly.";

  let contents;

  if (source.file) {
    contents = {
      parts: [
        { text: `My question is: ${userQuestion}` },
        { inlineData: { mimeType: source.file.mimeType, data: source.file.data } },
      ],
    };
  } else if (source.text) {
    contents = `Paper Content:\n${source.text}\n\nMy question is: ${userQuestion}`;
  } else {
    throw new Error("No content provided to analyze.");
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: { systemInstruction },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};
