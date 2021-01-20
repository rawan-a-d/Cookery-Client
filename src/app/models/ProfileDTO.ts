import { UserBase } from "./UserBase";

export class ProfileDTO {
    user: UserBase; // id, name, email
    image: string;
    recipesNr: number;
    followersNr: number;
    followeesNr: number;

    constructor(init?: Partial<ProfileDTO>){
        // This constructor will work with any type and will assign any matching filed.
        Object.assign(this, init);
    }
}