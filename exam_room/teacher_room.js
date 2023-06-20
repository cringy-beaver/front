import {Room} from './room.js';
import {checkToken, updateToken} from '../token_update.js'

checkToken();
await updateToken();
let roomStorage = JSON.parse(localStorage.getItem('room'));
let room = {};
const roomIdField = document.querySelector('#room-id');
const socket = new WebSocket('ws://exam4u.site:5002/');
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
    switch (jsonEvent['action']){
        case 'create_room': createRoomParser(jsonEvent)
    }
});

function createRoomParser(jsonEvent){
    if (jsonEvent['status'] === 'FAILURE') {
        alert(jsonEvent['message'])
    } else {
        const data = jsonEvent['data']['data'];
        room = new Room(data)
        const roomId = document.createElement('p');
        roomId.textContent = room.getId();
        roomIdField.appendChild(roomId);
    }
}