export class User {
    constructor(name, secondName, id, task, taskTime) {
        this.name = name;
        this.secondName = secondName;
        this.id = id;
        this.task = task;
        this.taskTime = taskTime;
    }
    fromResponse(obj){
        return new User(obj.name, obj.secondName, obj.id, obj.task, obj.taskTime)
    }
}