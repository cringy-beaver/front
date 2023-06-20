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
        const linksArray = await uploadZip(file);
        tickets = linksArray;
        for (let i = 0; i < linksArray.length; i++){
            questions.append(createPicture(linksArray[i]['name'], linksArray[i]['url']));
        }
    } catch (error) {
        alert(error.message);
    }
});

async function uploadZip(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://exam4u.site:5555/pics/upload', {
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
        let res = [];
        for (let i = 0; i < jsonResponse['links'].length; i++) {
            let name = Object.keys(jsonResponse['original_to_unique_names'])[i]
            res.push({
                'name': name,
                'url': jsonResponse['links'][i],
                'description': jsonResponse['original_to_unique_names'][name],
            })
        }
        return res;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error('An error occurred while uploading the file');
    }
}

function createPicture(name, source) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'question');
    const img = document.createElement('img');
    img.setAttribute('src', source);
    newDiv.append(img);
    const innerDiv = document.createElement('q-description');
    const heading = document.createElement('h5');
    heading.textContent = name;
    innerDiv.append(heading);
    newDiv.append(innerDiv);
    return newDiv;
}

createButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const createForm = document.querySelector('#create-form');
    const formData = new FormData(createForm);
    const userJSON = JSON.parse(localStorage.getItem('user'));
    let roomStorage =
        {
            name: `${userJSON.name} ${userJSON.second_name}`,
            room: formData.get('room-name'),
            capacity: formData.get('student-count'),
            tickets: tickets
        }
    localStorage.setItem('room', JSON.stringify(roomStorage));
    window.location.href='../exam_room/teacher.html';
})