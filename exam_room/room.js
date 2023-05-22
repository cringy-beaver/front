export class Room {
    constructor(teacherName, roomName, capacity, tickets) {
        this.teacherName = teacherName;
        this.roomName = roomName;
        this.capacity = capacity;
        this.studentsSet = new Set();
        this.ticketsSet = new Set(tickets);
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
}