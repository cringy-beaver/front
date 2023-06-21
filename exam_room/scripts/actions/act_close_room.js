import {User} from "../../structures/user.js";


export function closeRoomAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        UpdateRoom(room);
    }
}

function UpdateRoom(room, user) {
    alert(`Room closed`);
}

