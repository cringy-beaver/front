import {Task} from "../../structures/task.js";
import {User} from "../../structures/user.js";


export function getTaskAction(jsonEvent, room){
    if (jsonEvent['status'] === 'FAILURE') {
        alert(jsonEvent['message']);
    }
    else {
        const data = jsonEvent['data'];

        if (jsonEvent['status'] === 'REDIRECT') {
            alert('REDIRECT');
            return
        }

        // Если событие получил вдаледец комнаты TODO [1] блять а почему у нас условие написано не через if-else на js а через "Если" на русском
        if (data.user !== undefined) {
            const user = User.fromJson(data.user);
            // UpdateRoom(room, user); TODO нахуя нам обновлять комнату админа если юхер получил билет
        }

        // Если событие получил юзер TODO [1]
        if (data.task !== undefined) {
            const task = window.roomEnities['task'] = Task.fromJson(data.task);
            const user = window.roomEnities['user'];
            user.drawTask(task);
        }
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} get task`);
//     room.updateUser(user);
// }
//
// function UpdateTask(task) {
//     alert('Task created');
//
//     // TODO: Добавить обновление задания
// }
