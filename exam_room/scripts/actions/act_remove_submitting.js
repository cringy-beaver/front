import {User} from "../../structures/user.js";


export function removeSubmittingAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        UpdateRoom(room);
    }
}

function UpdateRoom(room) {
    alert(`Remove submitting`);
    room.removeSubmitting();
}

