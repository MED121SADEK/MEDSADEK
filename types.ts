
export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
}
