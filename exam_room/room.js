import {User} from "./user";

export class Room {
    constructor(obj) {
        this.owner = new User(obj.owner);
        this.queue = obj.queue.map(function(q) {
            return new User(q);
        });
        this.submitUser = new User(obj.submitting_user);
        this.usersNotQueue = obj.users_not_in_queue.map(function(q) {
            return new User(q);
        });
        this.id = obj.id;
    }

    getId() {
        return this.id;
    }

    getQueue() {
        return this.queue;
    }
}