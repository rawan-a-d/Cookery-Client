import { Ingredient } from './Ingredient';
import { User } from './User';

export class RecipeDTO {
    id: number;
    name: string;
    image: string;
    user: User;
    favouriteId: number;
    isFavourite: boolean;

    // constructor(init?: Partial<Recipe>){
    //     // This constructor will work with any type and will assign any matching filed.
    //     Object.assign(this, init);
    // }
}