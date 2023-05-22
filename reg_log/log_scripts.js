const SERVER = 'http://exam4u.ru:5001'

const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#login-btn");
const loginInput = document.querySelector('#loginForm input[name="login"]');
const passwordInput = document.querySelector('#loginForm input[name="password"]');
loginBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    const queryString = new URLSearchParams(new FormData(loginForm)).toString();
    let pretest = await fetch(`${SERVER}/signin?${queryString}`, {
        method: 'POST',
    });
    let test = await pretest.json();
    await fetch(`${SERVER}/signin?${queryString}`, {
        method: 'POST',
    }).then(async function(response){
        if (response.status === 200){
            const responseJSON = await response.json()
            localStorage.setItem('token', responseJSON.access_token);
            localStorage.setItem('ttl', responseJSON.time_left);
            // localStorage.setItem()
            window.location.href = '../exam_room/student.html';
        } else if (response.status === 401 || response.status === 402) {
            const inputs = document.querySelectorAll('#loginForm input')
            for (let input of inputs){
                input.classList.add('input-error')
            }
            inputs[1].placeholder = 'Неверный логин или пароль'
            inputs[1].value = ''
        }
    }).catch(error => {
       alert(error.code)
    })
});

loginInput.addEventListener('focus', () => {normalizePasswordsAndLogin()})
passwordInput.addEventListener('focus', () => {normalizePasswordsAndLogin()})

function normalizePasswordsAndLogin(){
    if (passwordInput.classList.contains('input-error')) {
        passwordInput.classList.remove('input-error');
    }
    passwordInput.placeholder = 'Введите пароль';
    if (loginInput.classList.contains('input-error')) {
        loginInput.classList.remove('input-error');
    }
}