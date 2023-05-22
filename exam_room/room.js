export class Room {
    constructor(teacherName, roomName, capacity, tickets, names) {
        this.teacherName = teacherName;
        this.roomName = roomName;
        this.capacity = capacity;
        this.studentsSet = [];
        this.ticketsSet = tickets;
        this.names = names;
    }

    static fromObject(obj){
        return new Room(obj.teacherName, obj.roomName, obj.capacity, obj.studentsSet, obj.ticketsSet, obj.names)
    }
    toJSON() {
        return {
            teacherName: this.teacherName,
            roomName: this.roomName,
            capacity: this.capacity,
            studentsSet: this.studentsSet,
            ticketsSet: this.ticketsSet,
            names: this.names
        }
    }

    getTeacherName() {
        return this.teacherName;
    }

    getRoomName() {
        return this.roomName;
    }

    getRandomTicket() {

    }

    getQueue() {

    }

    getNames() {
        return this.names;
    }
}