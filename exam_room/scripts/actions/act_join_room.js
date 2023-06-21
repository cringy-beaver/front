import {Room} from "../../structures/room.js";
// import {room} from "../teacher_room";
import {User} from "../../structures/user.js";


export function joinRoomAction(jsonEvent, room){
    if (jsonEvent['status'] === 'FAILURE') {
        // Сказать пользователю, что произошла ошибка и вернуть обратно его
        alert(jsonEvent['message']);
        window.location.href = `invitation.html?message=${jsonEvent['message']}`
    }
    else {
        const data = jsonEvent['data'];

        if (jsonEvent['status'] === 'REDIRECT') {
            alert('REDIRECT');
        }

        if (data.room !== undefined) {
            room.updateRoom(Room.fromJson(data.room));
            const user = User.fromJson(data.user);
            UpdateNewRoom(room, user);
        } else {
            const user = User.fromJson(data.user);
            UpdateRoom(room, user);
        }
    }
}

function UpdateRoom(room, user) {
    // Вызывается при подключении нового юзера к комнате (у остальных)
    alert(`User ${user.getName()} ${user.getSecondName()} joined room ${room.getId()}`);
    updateQueue();
    room.joinRoom(user);
}

function UpdateNewRoom(room, user) {
    // Вызывается при первом подключении к комнате юзера
    alert('Joined room');
    updateQueue();
}

function updateQueue(){
    // for (let user in room.getQueue()) {
    //     let newParagraph = document.createElement('p');
    //     newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
    //     queue.appendChild(newParagraph);
    // }
}