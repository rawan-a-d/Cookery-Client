import { Ingredient } from './Ingredient';
import { UserDTO } from './UserDTO';

export class RecipeFollowDTO {
    id: number;
    name: string;
    image: string;
    description: string;
    ingredients: Ingredient[];
    user: UserDTO;
    favouriteId: number;
    isFavourite: boolean;
    followId: number;
    isFollowed: boolean;
}