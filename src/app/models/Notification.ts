export class Notification {
    constructor(public id: number, public userName: string, public userId: number, 
        public recipeId: number, public isSeen: boolean){}
}