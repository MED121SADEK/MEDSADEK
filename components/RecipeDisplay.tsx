
import React from 'react';
import type { Recipe } from '../types';
import { Clock, Users, Soup, ListChecks } from 'lucide-react';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center justify-center bg-green-50 p-4 rounded-lg text-center border border-green-200">
        <div className="text-green-600 mb-2">{icon}</div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        <span className="text-lg font-bold text-gray-800">{value}</span>
    </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 text-center">{recipe.recipeName}</h2>
      <p className="text-gray-600 text-center mb-8">{recipe.description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <InfoCard icon={<Clock size={28} />} label="Prep Time" value={recipe.prepTime} />
          <InfoCard icon={<Soup size={28} />} label="Cook Time" value={recipe.cookTime} />
          <InfoCard icon={<Users size={28} />} label="Servings" value={recipe.servings} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><ListChecks className="w-6 h-6 mr-2 text-green-600"/>Ingredients</h3>
            <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
                    <li key={index} className="flex items-start p-2 bg-gray-50 rounded-md">
                      <span className="text-green-600 font-bold mr-2">&#8226;</span>
                      <div>
                        <span className="font-semibold text-gray-700">{ing.name}</span>
                        <span className="text-gray-600"> - {ing.quantity}</span>
                      </div>
                    </li>
                ))}
            </ul>
        </div>

        <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><ListChecks className="w-6 h-6 mr-2 text-green-600"/>Instructions</h3>
            <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full mr-4">{index + 1}</span>
                        <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                ))}
            </ol>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RecipeDisplay;
