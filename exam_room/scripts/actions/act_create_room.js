import {Room} from "../../structures/room.js";


function createRoomAction(jsonEvent, room){
    if (jsonEvent['status'] === 'FAILURE') {
        // Сказать пользователю, что произошла ошибка и вернуть обратно его
        alert(jsonEvent['message'])
    } else {
        const data = jsonEvent['data'];
        room = Room.fromJson(data);

        UpdateRoom(room);
    }
}

function UpdateRoom(room) {
    // TODO: Реализовать отрисовку комнаты, очереди и т.д.

    const roomId = document.createElement('p');
    roomId.textContent = room.getId();
    roomIdField.appendChild(roomId);
}