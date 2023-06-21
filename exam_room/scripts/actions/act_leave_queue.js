import {User} from "../../structures/user.js";


export function leaveQueueAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        // Если событие получил не запрашивающий юзер
        if (data.user) {
            const user = User.fromJson(data.user);
            UpdateRoom(room, user);
        } else {
            alert('SUCCESS');
            // Добавить себя в очередь
        }
    }
}

function UpdateRoom(room, user) {
    alert(`User ${user.getName()} ${user.getSecondName()} leave queue`);
}

