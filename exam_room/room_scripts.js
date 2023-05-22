import { Room } from './room.js';

const questions = document.querySelector('.questions');
const uploadButton = document.querySelector('#upload-button');
const createButton = document.querySelector('#create-button');
let tickets = [];
uploadButton.addEventListener('click', async () => {
    const fileInput = document.querySelector('#input-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    try {
        const links = await uploadZip(file);
        tickets = links;
        for (let i = 0; i < links.length; i++){
            questions.append(createPicture(i, links[i]));
        }
    } catch (error) {
        alert(error.message);
    }
});

async function uploadZip(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://exam4u.ru:5555/pics/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.log(response)
            const contentType = response.headers.get('content-type');
            let errorMessage = `HTTP error! status: ${response.status}`;

            if (contentType && contentType.includes('application/json')) {
                const jsonResponse = await response.json();
                errorMessage = jsonResponse.error || errorMessage;
            }

            throw new Error(errorMessage);
        }

        const jsonResponse = await response.json();
        return jsonResponse.links;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error('An error occurred while uploading the file');
    }
}

function createPicture(number, source) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'question');
    const img = document.createElement('img');
    img.setAttribute('src', source);
    newDiv.append(img);
    const innerDiv = document.createElement('q-description');
    const heading = document.createElement('h5');
    heading.textContent = `Билет ${number+1}`;
    innerDiv.append(heading);
    newDiv.append(innerDiv);
    return newDiv;
}

createButton.addEventListener("click", async function (e) {
    let user = 0;
    await fetch(`${SERVER}/user_info?token=${getCookie('token')}`, {
        method: 'GET',
    }).then(response => {
        if (response.code === 200){
            user = response.json().user;
        } else {
            throw new Error(response.code);
        }
    }).catch(error => {
        alert(error.code) // TODO: логирование ошибок
    })
    const createForm = document.querySelector('#create-form');
    const formData = new FormData(createForm);
    const room = new Room(`${user.name} ${user.second_name}`, formData.get('room-name'), formData.get('student-count'), tickets)
    localStorage.setItem()
})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}