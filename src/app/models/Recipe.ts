import { Ingredient } from './Ingredient';

export class Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    ingredients: Ingredient[];
}