import {showModalWindow} from "./modal_window.js";

const idField = document.querySelector("#id-field");
const joinButton = document.querySelector("#join-btn");
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('message')) {
    const message = urlParams.get('message');
    showModalWindow(message, 200)
}

joinButton.addEventListener('click', joinGroup)
function joinGroup(){
    const id = idField.value;
    window.location.href = `student.html?id=${id}`;
}