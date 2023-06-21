import {Room} from '../structures/room.js';
// import {showModalWindow} from "./modal_window.js";
import {User} from "../structures/user.js";
import {checkToken, updateToken} from '../../token_update.js'

import {joinRoomAction} from './actions/act_join_room.js'
import {getTaskAction} from './actions/act_get_task.js'
import {joinQueueAction} from './actions/act_join_queue.js'
import {leaveQueueAction} from './actions/act_leave_queue.js'

checkToken();
await updateToken();

const urlParams = new URLSearchParams(window.location.search);
let room = new Room(null, null, null, null, null)
let user = {};
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
        // case 'join_room':
        //     joinRoomParser(jsonEvent);
        //     break;
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
        default:
            alert('Socket parser error!')
    }});

// function joinRoomParser(jsonEvent){
//     if (jsonEvent['status'] === 'FAILURE') {
//         window.location.href = `invitation.html?message=${jsonEvent['message']}`
//     } else {
//         room = new Room(jsonEvent.data.room)
//         if (jsonEvent['status'] === 'REDIRECT') {
//             showModalWindow('', 300)
//         }
//         if (jsonEvent['message'] !== 'User joined'){
//             user = new User(jsonEvent.data.user)
//         }
//         updateQueue();
//     }
// }
//
// function updateQueue(){
//     for (let user in room.getQueue()) {
//         let newParagraph = document.createElement('p');
//         newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
//         queue.appendChild(newParagraph);
//     }
// }

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

// function getTaskParser(jsonEvent) {
//     if (jsonEvent['status'] === 'SUCCESS') {
//         const image = document.querySelector('#ticket-image');
//         const text = document.querySelector('#ticket-text');
//         const data = JSON.parse(jsonEvent.data)
//         image.src = data.url
//         image.alt = data.name
//         text.value = data.name
//     } else {
//         alert(jsonEvent['message'])
//     }
// }

function joinQueueParser(jsonEvent){
    if (jsonEvent['message'] === 'SUCCESS') {
        const newQueueUser = document.createElement('p');
        if (jsonEvent['data'].has('user')) {
            let tmpUser = new User(JSON.parse(jsonEvent['data']['user']))
            newQueueUser.textContent = `${tmpUser.getName()} ${tmpUser.getSecondName()}`
        } else {
            newQueueUser.textContent = `${user.getName()} ${user.getSecondName()}`
        }
        queue.appendChild(newQueueUser)
    }
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