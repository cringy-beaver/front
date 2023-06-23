import {User} from "./user.js";
import {deleteUser} from "../utils/deleteUser.js";

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

    leaveRoom(user) {
        for (let i = 0; i < this.usersNotQueue.length; i++) {
            if (this.usersNotQueue[i].id === user.id) {
                this.usersNotQueue.splice(i, 1);
            }
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === user.id) {
                this.queue.splice(i, 1);
            }
        }
        this.deleteHeapUser(user);
        this.deleteQueueUser(user);
    }

    updateRoom(room) {
        this.owner = room.owner;
        this.queue = room.queue;
        this.usersNotQueue = room.usersNotQueue;
        this.submitUser = room.submitUser;
        this.id = room.id;
        room.loadQueue();
        room.loadHeap();
        const user = window.roomEnities['user'];
        if (room.owner.id !== user.id){
            user.drawTask(user.task)
        }
        user.drawTask(null);
        this.updateSubmittingUserQueue(this.submitUser);
        if (user.id === room.owner.id){
            room.getSubmittingUser(this.submitUser);
        }
    }

    updateQueue(user) {
        const queue = window.roomEnities['queue'];
        queue.appendChild(this.getUserNameDiv(user));
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
        const elements = Array.from(queue.querySelectorAll('div'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                element.remove();
            }
        });
    }

    deleteHeapUser(user) {
        const heap = window.roomEnities['heap'];
        const elements = Array.from(heap.querySelectorAll('div'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                element.remove();
            }
        });
    }

    addUserNotQueue(user) {
        const heap = window.roomEnities['heap'];
        heap.appendChild(this.getUserNameDiv(user));
    }

    getSubmittingUser(user) {
        if (user === null || user === undefined) {
            return
        }
        const student = window.roomEnities['student'];
        student.appendChild(this.getUserNameDiv(user, false));
        const owner = User.fromJson(window.roomEnities['user']);
        owner.drawTask(user.task);
    }

    updateSubmittingUserQueue(user) {
        if (user === null || user === undefined){
            return
        }
        const queue = window.roomEnities['queue'];
        const elements = Array.from(queue.querySelectorAll('div'));
        elements.forEach(function(element) {
            if (element.id === user.id) {
                const text = element.querySelector('p');
                const button = element.querySelector('button');
                text.style.color = "green";
                element.removeChild(button);
            }
        });
    }

    removeStudentTeacher() {
        const ticket = window.roomEnities['ticket'];
        const student = window.roomEnities['student'];
        ticket.innerHTML = "";
        student.innerHTML = "";
    }

    createDeleteButton(id){
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        const roomId = this.id;
        deleteButton.id = `delete_${id}`;
        const socket = window.roomEnities['socket'];
        deleteButton.addEventListener('click', function() {deleteUser(socket, id, roomId);})
        return deleteButton;
    }

    isOwner() {
        return this.owner.id === window.roomEnities['user'].id;
    }

    getUserNameDiv(user, isCreateButton = true){
        const div = document.createElement('div');
        div.id = user.id;
        div.classList.add('flex');
        const newParagraph = document.createElement('p');
        newParagraph.textContent = user.getFullName();
        newParagraph.id = `p_${user.id}`;
        div.appendChild(newParagraph);
        if (this.isOwner() && isCreateButton) {
            div.appendChild(this.createDeleteButton(user.id))
        }
        return div;
    }
}