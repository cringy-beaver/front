import {Room} from '../create_exam_room/room.js';
import {showModalWindow} from "./modal_window";

const urlParams = new URLSearchParams(window.location.search);
let room = {};
const roomId = urlParams.get('id');
const socket = new WebSocket('ws://exam4u.site:5002/', ['soap', 'xmpp']);
socket.addEventListener('open', socketJoinRoom)
const getBtn = document.querySelector('#get-ticket');
getBtn.addEventListener('click', getTask)

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
    switch (jsonEvent['action']) {
        case 'join_room':
            joinRoomParser(jsonEvent);
            break;
        case 'get_task':
            getTaskParser(jsonEvent);
            break;
        default:
            alert('Socket parser error!')
    }});

function joinRoomParser(jsonEvent){
    if (jsonEvent['status'] === 'FAILURE') {
        window.location.href = `invitation.html?message=${jsonEvent['message']}`
    } else {
        room = new Room(JSON.parse(jsonEvent.data))
        if (jsonEvent['status'] === 'REDIRECT') {
            showModalWindow('', 300)
        }
        updateQueue();
    }
}

function updateQueue(){
    const queue = document.querySelector('#queue');
    for (let user in room.getQueue()) {
        let newParagraph = document.createElement('p');
        newParagraph.textContent = `${user.getName()} ${user.getSecondName()}`
        queue.appendChild(newParagraph);
    }
}

function getTask(){
    const getTaskData = {
        'action': 'get_task',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : room.getId()
        }
    }
    socket.send(JSON.stringify(getTaskData));
}

function getTaskParser(jsonEvent) {
    if (jsonEvent['status'] === 'SUCCESS') {
        const image = document.querySelector('#ticket-image');
        const text = document.querySelector('#ticket-text');
        const data = JSON.parse(jsonEvent.data)
        image.src = data.url
        image.alt = data.name
        text.value = data.name
    } else {
        alert(jsonEvent['message'])
    }
}