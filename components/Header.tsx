
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <UtensilsCrossed className="w-8 h-8 text-green-600 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
          AI Recipe Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
