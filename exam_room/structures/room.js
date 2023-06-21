import {User} from "./user.js";

export class Room {
    // constructor(obj) {
    //     this.owner = new User(obj.owner);
    //     this.queue = obj.queue.map(function(q) {
    //         return new User(q);
    //     });
    //     this.submitUser = new User(obj.submitting_user);
    //     this.usersNotQueue = (obj.users_not_in_queue.length > 0) ? obj.users_not_in_queue.map(function(q) {
    //         return new User(q);
    //     }) : [];
    //     this.id = obj.id;
    // }

    constructor(owner, queue, usersNotQueue, submitUser, id) {
        this.owner = owner;
        this.queue = queue;
        this.usersNotQueue = usersNotQueue;
        this.submitUser = submitUser;
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getQueue() {
        return this.queue;
    }

    static fromJson(json) {
        const owner = User.fromJson(json.owner);

        const queue = json.queue.map(function(q) {
            return User.fromJson(q);
        });


        let submitUser;
        if (json.submitting_user !== null) {
            submitUser = User.fromJson(json.submitting_user);
        }

        const usersNotQueue = (json.users_not_in_queue.length > 0) ? json.users_not_in_queue.map(function(q) {
            return User.fromJson(q);
        }) : [];

        const id = json.id;

        return new Room(owner, queue, usersNotQueue, submitUser, id);
    }

    updateRoom(room) {
        this.owner = room.owner;
        this.queue = room.queue;
        this.usersNotQueue = room.usersNotQueue;
        this.submitUser = room.submitUser;
        this.id = room.id;
    }
}