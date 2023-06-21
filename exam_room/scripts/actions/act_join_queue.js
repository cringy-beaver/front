import {User} from "../../structures/user.js";


export function joinQueueAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        window.roomEnities['user'] = User.fromJson(data.user);
        // const user = window.roomEnities['user'];
        room.joinQueue();
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} join queue`);
//     room.joinQueue(user);
// }

