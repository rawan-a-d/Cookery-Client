import { UserBase } from "./UserBase";

export class ProfileDTO {

    constructor(public user: UserBase, public recipesNr: number, public followersNr: number){ }
    
}