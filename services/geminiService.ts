import { GoogleGenAI } from "@google/genai";

/**
 * Fetches an interesting fun fact about a country using the Gemini API.
 * Adheres to the SDK requirement of direct process.env.API_KEY usage.
 */
export async function fetchFunFact(countryName: string): Promise<string> {
  // Fix: Directly check for the existence of the required API key without re-assigning it to a local variable if possible
  if (!process.env.API_KEY) return "Facts are currently unavailable. Explore and learn!";

  // Fix: Always use process.env.API_KEY directly in the initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide one extremely interesting, short (max 20 words) fun fact about the country: ${countryName}. Don't start with 'Did you know'.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });

    // Fix: Directly access the .text property from GenerateContentResponse as it is not a method
    return response.text.trim() || "A fascinating land with a rich history.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A beautiful country with unique traditions.";
  }
}