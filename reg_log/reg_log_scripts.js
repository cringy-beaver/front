const LOGIN_ALREADY_USED = 303 // TODO: change

const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#login-btn");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
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
        const inputs = document.querySelectorAll('#loginForm input')
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
    if (formData.get("password") !== formData.get("repeated-password")){
        const passwords = Array.from(document.querySelectorAll('#regForm input[type="password"]'));
        for (let pw of passwords){
            pw.classList.add('error')
            // TODO: надо где-то добавить, что пароли не совпадают. Лучше просто всплывающее окно оформить
        }
        const modalText = modal.querySelector("p");
        modalText.textContent = "Пароли не совпадают"
        modal.style.display = "block";
    }
    // let response = await fetch('/stepa/nado/sdelat/normalno', {
    //     method: 'POST',
    //     body: formData
    // })
    // let result = await response.json()
    if (2 === 3) {
        window.location.href = '../hub.html';
    } else if (303 === LOGIN_ALREADY_USED){
        const login = document.querySelector('#regForm input[name="login"]')
        login.classList.add('error')
        const modalText = modal.querySelector("p");
        modalText.textContent = "Логин уже использован"
        modal.style.display = "block";
    } else {
        const inputs = document.querySelectorAll('#regForm input')
        for (let input of inputs){
            input.classList.add('error') // TODO: надо, чтобы красилось в красный, сейчас почему-то не работает. То есть, добавление работает, а error Он не видит
        }
    }
});