import {User} from "./user.js";

export class Room {
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

    updateUser() {
        const user = window.roomEnities['user'];
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === user.id) {
                this.queue[i] = user;
                return;
            }
        }

        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue[i] = user;
                return;
            }
        }
    }

    joinQueue() {
        const user = window.roomEnities['user'];
        this.queue.push(user);
        this.updateQueue(user)
        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue.splice(i, 1);
                return;
            }
        }
    }

    leaveQueue() {
        const user = window.roomEnities['user'];
        this.deleteQueueUser(user);
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === user.id) {
                this.queue.splice(i, 1);
                return;
            }
        }
        this.usersNotQueue.push(user);
    }

    setNewSubmitUser(user) {
        this.submitUser = user;
    }

    removeSubmitUser() {
        this.submitUser = null;
    }

    joinRoom() {
        this.usersNotQueue.push(user);
    }

    leaveRoom() {
        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue.splice(i, 1);
                return;
            }
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === user.id) {
                this.queue.splice(i, 1);
                return;
            }
        }
    }

    updateRoom(room) {
        this.owner = room.owner;
        this.queue = room.queue;
        this.usersNotQueue = room.usersNotQueue;
        this.submitUser = room.submitUser;
        this.id = room.id;
    }

    updateQueue(user) {
        const queue = window.roomEnities['queue'];
        let newParagraph = document.createElement('p');
        newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
        newParagraph.id = user.id;
        queue.appendChild(newParagraph);
    }

    loadQueue(){
        for (let user of this.queue){
            this.updateQueue(user);
        }
    }

    updateUsersNotQueue(){
        const user = window.roomEnities['user'];
        this.usersNotQueue.push(user);
    }

    deleteQueueUser(user) {
        const queue = window.roomEnities['queue'];
        const elements = Array.from(queue.querySelectorAll('p'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                element.remove();
            }
        });
    }
}