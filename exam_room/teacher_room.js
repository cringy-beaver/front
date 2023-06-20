import {Room} from './room.js';

let roomStorage = JSON.parse(localStorage.getItem('room'));
let room = {};
const socket = new WebSocket('ws://exam4u.site:5002/', ['soap', 'xmpp']);
socket.addEventListener('open', socketCreateRoom)
function socketCreateRoom() {
    const createData = {
        'action': 'create_room',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'tasks': roomStorage.tickets,
            'max_visitors': roomStorage.capacity,
            'description': JSON.stringify({
                'name': roomStorage.name,
                'room': roomStorage.room,
            })
        }
    }
    socket.send(JSON.stringify(createData));
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
        room = new Room((JSON.parse(jsonEvent.data)))
        const roomIdField = document.querySelector('#room-id');
        const roomId = document.createElement('p');
        roomId.textContent = room.getId();
        roomIdField.appendChild(roomId);
    }
}