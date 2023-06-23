import {User} from "../../structures/user.js";


export function leaveRoomAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        const user = User.fromJson(data.user);
        const thisUser = window.roomEnities['user'];
        if (thisUser.id === user.id){
            alert('вас кикнули нахуй!')
            window.location.href = '../main_page/hub.html'
        }
        room.leaveRoom(user);
    }
}

// function UpdateRoom(room, user) {
//     alert(`User ${user.getName()} ${user.getSecondName()} leave room`);
//     room.leaveRoom(user);
// }

