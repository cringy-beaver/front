import {User} from "../../structures/user.js";


export function closeRoomAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        alert(message);
    }
    else {
        alert('вас кикнули нахуй')
        window.location.href = '../main_page/hub.html'
    }
}

function UpdateRoom(room, user) {
    alert(`Room closed`);
}

