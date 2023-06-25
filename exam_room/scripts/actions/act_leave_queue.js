import {User} from "../../structures/user.js";
import {createModal} from "../../../modal.js";


export function leaveQueueAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        createModal(message);
    }
    else {
        // Если событие получил не запрашивающий юзер
        if (data.user) {
            const user = User.fromJson(data.user);
            room.leaveQueue(user);
        } else {
            createModal('SUCCESS');
        }
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} leave queue`);
//     room.leaveQueue(user);
// }

