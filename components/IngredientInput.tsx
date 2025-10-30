
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAdd = () => {
    if (currentIngredient.trim()) {
      onAddIngredient(currentIngredient.trim());
      setCurrentIngredient('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., chicken breast, bell peppers"
          className="flex-grow w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <button
          onClick={handleAdd}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:bg-gray-400"
        >
          <Plus className="w-5 h-5 mr-1" /> Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {ingredients.map(ingredient => (
          <span
            key={ingredient}
            className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full"
          >
            {ingredient}
            <button
              onClick={() => onRemoveIngredient(ingredient)}
              className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
              aria-label={`Remove ${ingredient}`}
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
