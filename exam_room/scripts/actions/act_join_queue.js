import {User} from "../../structures/user.js";


export function joinQueueAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        const user = User.fromJson(data.user);
        room.joinQueue(user);
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} join queue`);
//     room.joinQueue(user);
// }

