
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: 'The name of the recipe.' },
    description: { type: Type.STRING, description: 'A short, appetizing description of the dish.' },
    prepTime: { type: Type.STRING, description: 'Preparation time, e.g., "15 minutes".' },
    cookTime: { type: Type.STRING, description: 'Cooking time, e.g., "30 minutes".' },
    servings: { type: Type.STRING, description: 'Number of servings, e.g., "4 servings".' },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.STRING },
        },
        required: ['name', 'quantity'],
      },
      description: 'A list of ingredients with their quantities.'
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Step-by-step cooking instructions.'
    },
  },
  required: ['recipeName', 'description', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions'],
};

export async function generateRecipe(ingredients: string[]): Promise<Recipe> {
  const prompt = `
    You are a creative chef. Generate a delicious and easy-to-follow recipe based on the following ingredients: ${ingredients.join(', ')}.
    Prioritize using the provided ingredients, but you can include common pantry staples like salt, pepper, oil, water, etc. if necessary.
    The recipe should be suitable for a home cook.
    Provide a creative name for the recipe.
    The output must be in JSON format matching the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation to ensure the parsed object looks like our Recipe type
    if (
        !recipeData.recipeName ||
        !Array.isArray(recipeData.ingredients) ||
        !Array.isArray(recipeData.instructions)
      ) {
        throw new Error("Invalid recipe format received from API");
      }
      
    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from API.");
  }
}
