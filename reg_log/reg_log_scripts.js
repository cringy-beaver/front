const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    let response = await fetch('/stepa/nado/sdelat/normalno', {
        method: 'GET',
        body: formData
    })
    let result = await response.json()
    if (result.ok) {

    } else {
        const inputs = document.querySelectorAll('.form-flex input')
        for (let input of inputs){
            input.classList.add('error') // TODO: надо, чтобы красилось в красный, сейчас почему-то не работает. То есть, добавление работает, а error Он не видит
        }
    }
});

const regForm = document.querySelector("#regForm");
const regBtn = document.querySelector("#reg-btn");
regBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    const formData = new FormData(regForm); // TODO: согласовать со Степой, формДата требует переаботки
    let response = await fetch('/stepa/nado/sdelat/normalno', {
        method: 'POST',
        body: formData
    })
    let result = await response.json()
    if (result.ok) {

    } else {
        const inputs = document.querySelectorAll('.form-flex input')
        for (let input of inputs){
            input.classList.add('error') // TODO: надо, чтобы красилось в красный, сейчас почему-то не работает. То есть, добавление работает, а error Он не видит
        }
    }
});