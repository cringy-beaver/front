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

    drawTask(task) {
        if (task === null){
            return;
        }
        const ticket = window.roomEnities['ticket'];
        const newImg = document.createElement('img');
        newImg.src = task.url;
        newImg.alt = task.name;
        newImg.id = 'ticket-image-id'
        newImg.setAttribute('class', 'ticket-image')
        const newText = document.createElement('p');
        newText.textContent = task.description;
        newText.id = 'ticket-text-id';
        newText.setAttribute('class', 'main-ticket-name')
        ticket.appendChild(newImg);
        ticket.appendChild(newText);
    }


}