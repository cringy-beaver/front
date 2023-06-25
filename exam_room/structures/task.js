export class Task {
    constructor(description, url, name) {
        this.name = name;
        this.url = url;
        this.description = description;
    }

    static fromJson(json) {
        let name;
        let url;
        let description;

        if (json.name !== undefined && json.url !== undefined && json.description !== undefined) {
            name = json.name;
            url = json.url;
            description = json.description;
        }

        return new Task(name, url, description);
    }
}