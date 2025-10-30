
import React, { useState, useCallback } from 'react';
import { generateRecipe } from './services/geminiService';
import type { Recipe } from './types';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Button from './components/Button';
import { ChefHat } from 'lucide-react';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate recipe. The model might be busy. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">What's in your kitchen?</h2>
            <p className="text-gray-600 mb-6">Enter the ingredients you have, and we'll whip up a recipe for you.</p>
            
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />

            <div className="mt-8 text-center">
              <Button onClick={handleGenerateRecipe} disabled={isLoading || ingredients.length === 0}>
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    Generating...
                  </>
                ) : (
                  <>
                    <ChefHat className="w-5 h-5 mr-2" />
                    Generate Recipe
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-10">
            {isLoading && !recipe && (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <LoadingSpinner className="w-12 h-12 text-green-600"/>
                <p className="mt-4 text-lg font-semibold text-gray-700">Finding the perfect recipe...</p>
                <p className="text-gray-500">This might take a moment.</p>
              </div>
            )}
            {recipe && <RecipeDisplay recipe={recipe} />}
            {!isLoading && !recipe && !error && (
              <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <ChefHat size={64} className="mx-auto text-green-500 opacity-50" />
                <h3 className="mt-4 text-2xl font-bold text-gray-700">Your recipe awaits!</h3>
                <p className="mt-2 text-gray-500">Add your ingredients above and click "Generate Recipe" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
