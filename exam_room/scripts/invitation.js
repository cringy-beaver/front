import {createModal} from "../../modal.js";

const idField = document.querySelector("#id-field");
const joinButton = document.querySelector("#join-btn");
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('message')) {
    const message = urlParams.get('message');
    createModal(message);
}

joinButton.addEventListener('click', joinGroup)
function joinGroup(){
    const id = idField.value;
    window.location.href = `student.html?id=${id}`;
}