import {Room} from "../../structures/room.js";
import {createModal} from "../../../modal.js";


export function createRoomAction(jsonEvent, room){
    if (jsonEvent['status'] === 'FAILURE') {
        // Сказать пользователю, что произошла ошибка и вернуть обратно его
        createModal(jsonEvent['message'])
    } else {
        const data = jsonEvent['data'];
        const room_tmp = Room.fromJson(data);
        const user = window.roomEnities['user'] = room_tmp.owner;
        room.updateRoom(room_tmp);
        // UpdateRoom(room);
        updateRoomId(room);
    }
}

// function UpdateRoom(room) {
//     // TODO: Реализовать отрисовку комнаты, очереди и т.д.
//
//     const roomId = document.createElement('p');
//     roomId.textContent = room.getId();
//     roomIdField.appendChild(roomId);
// }

function updateRoomId(room){
    const roomIdField = window.roomEnities['roomId'];
    const roomId = document.createElement('p');
    roomId.textContent = room.getId();
    roomIdField.appendChild(roomId);
}