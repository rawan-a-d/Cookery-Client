import { UserBase } from "./UserBase";

export class UserFollowDTO {
    constructor(public user: UserBase, public image: string){

    }
}


// UserDTO user = new UserDTO(userId, name, email, role, image);
