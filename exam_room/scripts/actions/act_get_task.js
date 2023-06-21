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

            window.roomEnities['task'] = Task.fromJson(data.task);
            window.roomEnities['user'].drawTask();
            // UpdateTask(task);
            return
        }

        // Если событие получил вдаледец комнаты TODO [1] блять а почему у нас условие написано не через if-else на js а через "Если" на русском
        if (data.user !== undefined) {
            window.roomEnities['user'] = User.fromJson(data.user);
            // UpdateRoom(room, user); TODO нахуя нам обновлять комнату админа если юхер получил билет
        }

        // Если событие получил юзер TODO [1]
        if (data.task !== undefined) {
            window.roomEnities['task'] = Task.fromJson(data.task);
            window.roomEnities['user'].drawTask();
        }
    }
}

function UpdateRoom(room, user) {
    alert(`User ${user.getName()} ${user.getSecondName()} get task`);
    room.updateUser(user);
}

function UpdateTask(task) {
    alert('Task created');

    // TODO: Добавить обновление задания
}
