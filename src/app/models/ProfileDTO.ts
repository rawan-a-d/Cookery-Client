import { UserBase } from "./UserBase";

export class ProfileDTO {
    // constructor(public user: UserBase, public image: string, public recipesNr: number, public followersNr: number){ }

    user: UserBase; // id, name, email
    image: string;
    recipesNr: number;
    followersNr: number;


    constructor(init?: Partial<ProfileDTO>){
        // This constructor will work with any type and will assign any matching filed.
        Object.assign(this, init);
    }
}