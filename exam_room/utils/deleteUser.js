export function deleteUser(socket, userId, roomId){
    const finishStudentData = {
        'action': 'leave_room',
        'token': localStorage.getItem('token'), // TODO check token live crate const
        'arg': {
            'room_id' : roomId,
            'user_id' : userId,
        }
    }
    socket.send(JSON.stringify(finishStudentData));
}