import { GoogleGenAI } from "@google/genai";
import { Opportunity, FilterState } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper function to clean markdown code blocks from JSON response
const cleanJson = (text: string): string => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateActionPlan = async (opportunity: Opportunity): Promise<string> => {
  const ai = getAiClient();
  
  const prompt = `
    You are a startup consultant. 
    First, perform a Google Search to find real-world competitors and market conditions in ${opportunity.country} for a "${opportunity.title}".
    
    Then, create a comprehensive business action plan for:
    Title: ${opportunity.title}
    Description: ${opportunity.description}
    Target Market: ${opportunity.country}
    Difficulty: ${opportunity.difficulty}
    Cost: ${opportunity.cost}
    
    The plan should be formatted in Markdown and include:
    1. Executive Summary (incorporate findings from your search)
    2. MVP Features
    3. Technical Stack Recommendations
    4. Marketing Strategy for ${opportunity.country} (reference real local platforms/channels if found)
    5. First 30 Days Roadmap
    
    Keep it practical and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable search for live data
      }
    });
    
    // We append the sources found by the search tool to the end of the plan
    let text = response.text || "Failed to generate plan.";
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      text += "\n\n### References & Real-time Data Sources\n";
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          text += `- [${chunk.web.title}](${chunk.web.uri})\n`;
        }
      });
    }

    return text;
  } catch (error) {
    console.error("Error generating action plan:", error);
    throw error;
  }
};

export const generateNewOpportunities = async (filters: FilterState): Promise<Opportunity[]> => {
  const ai = getAiClient();

  const prompt = `
    I need you to find REAL business opportunities based on current market trends.
    
    1. SEARCH for trending problems, emerging technologies, or market gaps in ${filters.country === 'All Countries' ? 'the world' : filters.country} related to ${filters.category === 'All Categories' ? 'Technology' : filters.category}.
    2. Based on your search results, generate 4 unique AI business ideas.
    
    Constraints:
    - Max Difficulty: ${filters.maxDifficulty === 'Any' ? 'High' : filters.maxDifficulty}
    - Max Cost: ${filters.maxCost === 'Any' ? 'High' : filters.maxCost}
    - Max Skill Level: ${filters.maxSkillLevel === 'Any' ? 'High' : filters.maxSkillLevel}

    Output the result STRICTLY as a JSON array of objects with no extra text. 
    The JSON structure must be:
    [
      {
        "title": "string",
        "category": "string",
        "country": "string",
        "description": "string",
        "difficulty": "Low" | "Medium" | "High",
        "cost": "Very Low" | "Low" | "Medium" | "High" | "Very High",
        "skillLevel": "Low" | "Medium" | "High",
        "sources": ["full_url_string_1", "full_url_string_2"]
      }
    ]

    Important: For "sources", include the actual URLs you found during your search that validated this opportunity.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Grounding
        // Note: We cannot use responseSchema WITH googleSearch in some versions, 
        // so we ask for JSON in the prompt and parse it manually.
      }
    });

    const text = response.text;
    if (!text) return [];

    const jsonString = cleanJson(text);
    const rawData = JSON.parse(jsonString);
    
    // Add IDs and ensure type safety
    return rawData.map((item: any, index: number) => ({
      ...item,
      id: `gen-${Date.now()}-${index}`,
      // Ensure enums match UI expectations (fallback defaults)
      difficulty: ["Low", "Medium", "High"].includes(item.difficulty) ? item.difficulty : "Medium",
      cost: ["Very Low", "Low", "Medium", "High", "Very High"].includes(item.cost) ? item.cost : "Medium",
      skillLevel: ["Low", "Medium", "High"].includes(item.skillLevel) ? item.skillLevel : "Medium",
    }));

  } catch (error) {
    console.error("Error generating opportunities:", error);
    // Fallback if JSON parsing fails or search fails
    console.log("Falling back to simulated response due to error");
    return []; 
  }
};