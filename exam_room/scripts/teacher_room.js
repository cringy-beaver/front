import {Room} from '../structures/room.js';
import {checkToken, updateToken} from '../../token_update.js'
import {leaveRoomAction} from "./actions/act_leave_room.js";
import {newSubmittingAction} from "./actions/act_new_submitting.js";
import {removeSubmittingAction} from "./actions/act_remove_submitting.js";
import {closeRoomAction} from "./actions/act_close_room.js";
import {getTaskAction} from "./actions/act_get_task.js";
import {joinQueueAction} from "./actions/act_join_queue.js";
import {joinRoomAction} from "./actions/act_join_room.js";
import {leaveQueueAction} from "./actions/act_leave_queue.js";
import {createRoomAction} from "./actions/act_create_room.js";
import {User} from "../structures/user.js";
import {Task} from "../structures/task.js";

checkToken();
await updateToken();
let roomStorage = JSON.parse(localStorage.getItem('room'));
let room = new Room(null, null, null, null, null)
let user = new User(null, null, null, null);
let task = new Task(null, null, null);
const queue = document.querySelector('#queue');
const ticket = document.querySelector('#ticket');
const heap = document.querySelector('#heap');
const leaveBtn = document.querySelector('#leave-room');
leaveBtn.addEventListener('click', leaveRoom)
const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', nextStudent)
const finishBtn = document.querySelector('#finish');
finishBtn.addEventListener('click', finishStudent)
const studentName = document.querySelector('#student-name');
const roomIdField = document.querySelector('#room-id');
const socket = new WebSocket('ws://exam4u.site:5002/');
window.roomEnities = {'queue': queue, 'ticket': ticket, 'room': room,
    'user': user, 'task': task, 'heap': heap, 'socket': socket,
    'student': studentName, 'roomId': roomIdField}

socket.addEventListener('open', socketCreateRoom);

function socketCreateRoom() {
    const createData = {
        'action': 'create_room',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'tasks': roomStorage.tickets,
            'max_visitors': Number(roomStorage.capacity),
            'description': JSON.stringify({
                'name': roomStorage.name,
                'room': roomStorage.room,
            })
        }
    }
    try {
        socket.send(JSON.stringify(createData));
    } catch (e) {
        alert(e)
    }
}

socket.addEventListener('message', function (event) {
    let jsonEvent = JSON.parse(event.data)
    console.log(jsonEvent)
    switch (jsonEvent['action']){
        case 'create_room':
            createRoomAction(jsonEvent, room)
            break
        case 'get_task':
            getTaskAction(jsonEvent, room);
            break;
        case 'join_queue':
            joinQueueAction(jsonEvent, room);
            break;
        case 'join_room':
            joinRoomAction(jsonEvent, room);
            break;
        case 'leave_queue':
            leaveQueueAction(jsonEvent, room);
            break;
        case 'leave_room':
            leaveRoomAction(jsonEvent, room);
            break;
        case 'new_submitting':
            newSubmittingAction(jsonEvent, room);
            break;
        case 'remove_submitting':
            removeSubmittingAction(jsonEvent, room);
            break;
        case 'close_room':
            closeRoomAction(jsonEvent, room);
            break;
        default:
            alert('Socket parser error!')
    }
});

function leaveRoom(){
    const leaveRoomData = {
        'action': 'leave_room',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id,
            'user_id' : user.id
        }
    }
    socket.send(JSON.stringify(leaveRoomData));
}

function nextStudent(){
    const nextStudentData = {
        'action': 'new_submitting',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id,
        }
    }
    socket.send(JSON.stringify(nextStudentData));
}

function finishStudent(){
    const finishStudentData = {
        'action': 'remove_submitting',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id,
        }
    }
    socket.send(JSON.stringify(finishStudentData));
}

roomIdField.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(room.id);
    } catch (err) {}
});