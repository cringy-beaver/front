import {Task} from "../../structures/task.js";


export function getTaskAction(jsonEvent, room){
    if (jsonEvent['status'] === 'FAILURE') {
        alert(jsonEvent['message']);
    }
    else {
        const data = jsonEvent['data'];

        if (jsonEvent['status'] === 'REDIRECT') {
            alert('REDIRECT');

            let task = Task.fromJson(data.task);
            UpdateTask(task);
            return
        }

        // Если событие получил вдаледец комнаты
        if (data.user !== undefined) {
            const user = User.fromJson(data.user);
            UpdateRoom(room, user);
        }

        // Если событие получил юзер
        if (data.task !== undefined) {
            let task = Task.fromJson(data.task);
            UpdateTask(task);
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
