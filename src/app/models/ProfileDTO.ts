import { UserBase } from "./UserBase";

export class ProfileDTO {
    constructor(public user: UserBase, public image: string, public recipesNr: number, public followersNr: number){ }
}