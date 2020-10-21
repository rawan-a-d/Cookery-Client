import { Ingredient } from './Ingredient';

export class Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    ingredients: Ingredient[];
    userId: number;

    constructor(init?: Partial<Recipe>){
        // This constructor will work with any type and will assign any matching filed.
        Object.assign(this, init);
    }
}