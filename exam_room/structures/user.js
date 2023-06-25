import {Task} from "./task.js";

export class User {
    constructor(name, secondName, id, task, taskTime) {
        this.name = name;
        this.secondName = secondName;
        this.id = id;
        this.task = task;
        this.taskTime = taskTime;
    }

    getName() {
        return this.name;
    }

    getSecondName() {
        return this.secondName;
    }

    getFullName() {
        return `${this.name} ${this.secondName}`
    }

    static fromJson(json) {
        const name = json.name;
        const secondName = json.second_name;
        const id = json.id;
        let taskTime = null;
        let task = null;

        if (json.task !== undefined && json.task !== null) {
            task = Task.fromJson(json.task);
            taskTime = new Date();
        } else {
            task = null;
            taskTime = null;
        }

        return new User(name, secondName, id, task, taskTime);
    }

    drawTask(task, isOwner = false) {
        if (task === null){
            return;
        }
        const ticket = window.roomEnities['ticket'];
        ticket.textContent = '';
        const newImg = document.createElement('img');
        newImg.src = task.url;
        newImg.alt = task.url;
        newImg.id = 'ticket-image-id'
        newImg.setAttribute('class', 'ticket-image')
        const newText = document.createElement('p');
        newText.textContent = task.description;
        newText.id = 'ticket-text-id';
        newText.setAttribute('class', 'main-ticket-name')
        ticket.appendChild(newImg);
        ticket.appendChild(newText);
        newImg.width = newImg.parentElement.offsetWidth;
        newImg.height = newImg.parentElement.offsetHeight * 0.6;
        const getBtn = document.querySelector('#get-ticket');
        if (getBtn !== null) {
            getBtn.classList.add('hidden');
        }
    }


}