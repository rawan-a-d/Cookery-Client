import { UserBase } from "./UserBase";

export class UserFollowDTO {
    constructor(public followId: number, public user: UserBase, public image: string){

    }
}


// UserDTO user = new UserDTO(userId, name, email, role, image);
