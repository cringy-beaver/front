import {User} from "../../structures/user.js";
import {createModal} from "../../../modal.js";


export function closeRoomAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        createModal(message);
    }
    else {
        createModal('Комната была удалена', true, '../main_page/hub.html');
        // window.location.href = '../main_page/hub.html'
    }
}

