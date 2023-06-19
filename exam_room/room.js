export class Room {
    constructor(owner, queue, submitUser, usersNotQueue, id) {
        this.owner = owner;
        this.queue = queue;
        this.submitUser = submitUser;
        this.usersNotQueue = usersNotQueue;
        this.id = id;
    }

    static fromResponse(obj){
        return new Room(obj.owner, obj.queue, obj.submitUser, obj.usersNotQueue, obj.id)
    }
}