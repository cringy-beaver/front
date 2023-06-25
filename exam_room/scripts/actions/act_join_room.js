import {Room} from "../../structures/room.js";
// import {room} from "../teacher_room";
import {User} from "../../structures/user.js";
import {createModal} from "../../../modal.js";


export function joinRoomAction(jsonEvent){
    const room = window.roomEnities['room'];
    if (jsonEvent['status'] === 'FAILURE') {
        // Сказать пользователю, что произошла ошибка и вернуть обратно его
        createModal(jsonEvent['message']); //TODO: зачем? пусть сразу выкидывает, там для этого есть специальное модальное окно. Просто оно пока не работает
        window.location.href = `invitation.html?message=${jsonEvent['message']}`
    }
    else {
        const data = jsonEvent['data'];

        if (jsonEvent['status'] === 'REDIRECT') {
            createModal('REDIRECT');
        }

        if (data.room !== undefined) {
            const user = window.roomEnities['user'] = User.fromJson(data.user);
            const task = window.roomEnities['task'] = user.task;
            room.updateRoom(Room.fromJson(data.room)); // TODO: так давайте сразу статик методов из словаря создавать комнату и просто меня ее в window
        } else {
            const user = User.fromJson(data.user);
            room.updateUsersNotQueue(user);
        }
    }
}