export class User {
    constructor(obj) {
        if (obj === null) {
            obj = {}
        }
        this.name = obj.name || '';
        this.secondName = obj.second_name || '';
        this.id = obj.id || '';
        this.task = obj.task || '';
        this.taskTime = obj.taskTime || '';
    }

    getName() {
        return this.name;
    }

    getSecondName() {
        return this.secondName;
    }
}