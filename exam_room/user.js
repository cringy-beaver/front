export class User {
    constructor(obj) {
        this.name = obj.name;
        this.secondName = obj.secondName;
        this.id = obj.id;
        this.task = obj.task || '';
        this.taskTime = obj.taskTime || '';
    }
}