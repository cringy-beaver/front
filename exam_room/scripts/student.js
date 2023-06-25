import {Room} from '../structures/room.js';
import {Task} from '../structures/task.js';
import {User} from "../structures/user.js";
import {checkToken, updateToken} from '../../token_update.js'

import {joinRoomAction} from './actions/act_join_room.js'
import {getTaskAction} from './actions/act_get_task.js'
import {joinQueueAction} from './actions/act_join_queue.js'
import {leaveQueueAction} from './actions/act_leave_queue.js'
import {leaveRoomAction} from './actions/act_leave_room.js'
import {newSubmittingAction} from './actions/act_new_submitting.js';
import {removeSubmittingAction} from './actions/act_remove_submitting.js';
import {closeRoomAction} from './actions/act_close_room.js';
import {createModal} from "../../modal.js";

checkToken();
await updateToken();

const urlParams = new URLSearchParams(window.location.search);
let room = new Room(null, null, null, null, null)
let user = new User(null, null, null, null);
let task = new Task(null, null, null);
const roomId = urlParams.get('id');
const socket = new WebSocket('ws://exam4u.site:5002/');
socket.addEventListener('open', socketJoinRoom)
const getBtn = document.querySelector('#get-ticket');
getBtn.addEventListener('click', getTask);
const joinBtn = document.querySelector('#join');
joinBtn.addEventListener('click', joinQueue);
const retractBtn = document.querySelector('#retract');
retractBtn.addEventListener('click', leaveQueue);
const queue = document.querySelector('#queue');
const ticket = document.querySelector('#ticket');
const heap = document.querySelector('#heap');
window.roomEnities = {'queue': queue, 'ticket': ticket, 'room': room, 'user': user, 'task': task, 'heap': heap}

function socketJoinRoom(){
    const joinData = {
        'action': 'join_room',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : roomId
            }
        }
    socket.send(JSON.stringify(joinData));
}

socket.addEventListener('message', function (event) {
    let jsonEvent = JSON.parse(event.data)
    console.log(jsonEvent)
    switch (jsonEvent['action']) {
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
            createModal('Socket parser error!')
    }});

function getTask(){
    const getTaskData = {
        'action': 'get_task',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id
        }
    }
    socket.send(JSON.stringify(getTaskData));
}

function joinQueue(){
    const joinQueueData = {
        'action': 'join_queue',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id
        }
    }

    socket.send(JSON.stringify(joinQueueData));
}

function leaveQueue(){
    const leaveQueueData = {
        'action': 'leave_queue',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.id
        }
    }

    socket.send(JSON.stringify(leaveQueueData));
}