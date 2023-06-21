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
}