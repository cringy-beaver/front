import {User} from "../../structures/user.js";


export function newSubmittingAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        const user = User.fromJson(data.user);
        UpdateRoom(room, user);
    }
}

function UpdateRoom(room, user) {
    alert(`User ${user.getName()} ${user.getSecondName()} new submitting`);
    room.setNewSubmitUser(user);
}

