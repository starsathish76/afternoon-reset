import { GoogleGenAI, Type } from "@google/genai";
import { Snack, RitualRecommendation, Shop } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getRitualSuggestion = async (
  mood: string,
  availableSnacks: Snack[]
): Promise<RitualRecommendation | null> => {
  const client = getClient();
  if (!client) return null;

  const snackListString = availableSnacks
    .map((s) => `- ${s.name} (ID: ${s.id}, Tags: ${s.moodTags.join(", ")})`)
    .join("\n");

  const prompt = `
    The user is feeling: "${mood}".
    Available snacks:
    ${snackListString}

    Recommend the single best snack for this mood.
    Also suggest a very short, 1-2 minute mental reset activity (e.g., breathing exercise, stretching, looking out a window) that pairs well with this snack to help them reset during a workday afternoon.
    
    Return JSON.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            snackId: { type: Type.STRING, description: "The ID of the recommended snack" },
            reasoning: { type: Type.STRING, description: "A comforting sentence explaining why this pairs with their mood." },
            activity: { type: Type.STRING, description: "A short instruction for a mental reset activity." },
          },
          required: ["snackId", "reasoning", "activity"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as RitualRecommendation;
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    return null;
  }
};

export const findNearbyShops = async (
  snackName: string,
  lat: number,
  lng: number
): Promise<{ text: string, shops: Shop[] }> => {
  const client = getClient();
  if (!client) return { text: "Service unavailable", shops: [] };

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 3 highly rated cafes or shops that serve "${snackName}" or similar items near me. List them briefly.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng,
            },
          },
        },
      },
    });

    const text = response.text || "No shops found.";
    
    // Extract grounding chunks
    const shops: Shop[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        shops.push({
          name: chunk.web.title,
          address: "View on Map",
          uri: chunk.web.uri
        });
      }
    });

    return { text, shops };
  } catch (error) {
    console.error("Error searching maps:", error);
    return { text: "Could not find nearby shops at this moment.", shops: [] };
  }
};