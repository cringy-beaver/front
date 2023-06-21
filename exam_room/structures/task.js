export class Task {
    constructor(name, url, description) {
        this.name = name;
        this.url = url;
        this.description = description;
    }

    static fromJson(json) {
        return new Task(json.name, json.url, json.description);
    }
}