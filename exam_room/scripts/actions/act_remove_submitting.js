import {User} from "../../structures/user.js";
import {createModal} from "../../../modal.js";


export function removeSubmittingAction(jsonEvent, room){
    const {status, message, data } = jsonEvent
    if (status === 'FAILURE') {
        createModal(message);
    }
    else {
        room.removeSubmitUser();
        const target = jsonEvent.target;
        if (target === 'owner') {
            room.removeStudentTeacher();
        }
    }
}

// function UpdateRoom(room) {
//     alert(`Remove submitting`);
//     room.removeSubmitting();
// }

