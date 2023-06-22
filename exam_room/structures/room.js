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

    joinQueue(user) {
        this.queue.push(user);
        this.updateQueue(user)
        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue.splice(i, 1);
            }
        }
        this.deleteHeapUser(user);
        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue[i] = user;
            }
        }
    }

    leaveQueue(user) {
        this.deleteQueueUser(user);
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === user.id) {
                this.queue.splice(i, 1);
            }
        }
        this.usersNotQueue.push(user);
        this.addUserNotQueue(user);
    }

    setNewSubmitUser(user) {
        this.submitUser = user;
    }

    removeSubmitUser() {
        const user = this.submitUser;
        this.submitUser = null;
        this.leaveQueue(user);
    }

    joinRoom() {
        this.usersNotQueue.push(user);
    }

    leaveRoom() {
        const user = window.roomEnities['user'];
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

    loadHeap(){
        for (let user of this.usersNotQueue){
            this.addUserNotQueue(user);
        }
    }

    updateUsersNotQueue(user){
        this.usersNotQueue.push(user);
        this.addUserNotQueue(user);
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

    deleteHeapUser(user) {
        const heap = window.roomEnities['heap'];
        const elements = Array.from(heap.querySelectorAll('p'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                element.remove();
            }
        });
    }

    addUserNotQueue(user) {
        const heap = window.roomEnities['heap'];
        let newParagraph = document.createElement('p');
        newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
        newParagraph.id = user.id;
        heap.appendChild(newParagraph);
    }

    getSubmittingUser(user) {
        const student = window.roomEnities['student'];
        let newParagraph = document.createElement('p');
        newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
        newParagraph.id = user.id;
        student.appendChild(newParagraph);
        const owner = User.fromJson(window.roomEnities['user']);
        owner.drawTask(user.task);
    }

    updateSubmittingUserQueue(user) {
        const queue = window.roomEnities['queue'];
        const elements = Array.from(queue.querySelectorAll('p'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                element.style.color = "green";
            }
        });
    }

    removeStudentTeacher() {
        const ticket = window.roomEnities['ticket'];
        const student = window.roomEnities['student'];
        ticket.innerHTML = "";
        student.innerHTML = "";
    }

}