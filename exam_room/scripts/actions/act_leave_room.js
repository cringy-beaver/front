import {User} from "../../structures/user.js";
import {createModal} from "../../../modal.js";


export function leaveRoomAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        createModal(message);
    }
    else {
        const user = User.fromJson(data.user);
        const thisUser = window.roomEnities['user'];
        if (thisUser.id === user.id){
            createModal('Комната была закрыта', true, '../main_page/hub.html')
            window.location.href = '../main_page/hub.html'
        }
        room.leaveRoom(user);
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} leave room`);
//     room.leaveRoom(user);
// }

