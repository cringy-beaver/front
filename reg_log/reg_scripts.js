const LOGIN_ALREADY_USED = 303 // TODO: change
const SERVER = 'http://exam4u.ru:5001'

const regForm = document.querySelector("#regForm");
const regBtn = document.querySelector("#reg-btn");
const passwords = Array.from(document.querySelectorAll('#regForm input[name="password"]'));
const loginInput = document.querySelector('#regForm input[name="login"]');
const passwordInput = passwords[0];
const repeatInput = passwords[1];
const passwordRequirements = document.querySelector("#password-requirements");

passwordInput.addEventListener('focus', function (e) {
    normalizePasswordsAndLogin()
    showPasswordRequirements();
    passwordInput.addEventListener('blur', closeModalOnClickOutside);
});

repeatInput.addEventListener('focus', function (){
    normalizePasswordsAndLogin();
});

loginInput.addEventListener('focus', function (){
    normalizePasswordsAndLogin();
})

regBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    const formData = new FormData(regForm); // TODO: согласовать со Степой, формДата требует переаботки
    if (!checkPasswords()){
        return;
    }
    debugger;
    const login = formData.get('login');
    const password = formData.get('password');
    const name = formData.get('name');
    const second_name = formData.get('lastname');
    const role = formData.get('role');

    await fetch(`${SERVER}/register?login=${login}&password=${password}&name=${name}&second_name=${second_name}&role=${role}`, {
        method: 'POST',
    }).then(response => {
        if (response.redirected){
            window.location.href = response.url;
        } else if (response.status === 405) {
            loginInput.classList.add('input-error');
            loginInput.placeholder = 'Такой логин уже используется'
            loginInput.value = '';
            passwordInput.value = 'Неверный логин или пароль';
        }
    }).catch(error => {
        alert(error.code) // TODO: логирование ошибок
    })
});

function checkPasswords() {
    if (!checkPassword(passwordInput.value)) {
        debugger;
        passwordInput.classList.add('input-error');
        passwordInput.value = '';
        passwordInput.placeholder = 'Пароль не соблюдает критерии';
        repeatInput.value = '';
        return false;
    } else if (passwordInput.value !== repeatInput.value){
        for (let pw of passwords){
            pw.classList.add('input-error');
            pw.value = '';
        }
        passwordInput.placeholder = '';
        repeatInput.placeholder = 'Пароли не совпадают';
        return false;
    }
    return true;
}


function showPasswordRequirements() {
    passwordRequirements.classList.remove('hidden');
}

function hidePasswordRequirements() {
    passwordRequirements.classList.add('hidden');
}

function closeModalOnClickOutside(event) {
    if (!passwordRequirements.contains(event.target)) {
        hidePasswordRequirements();
        document.removeEventListener('click', closeModalOnClickOutside);
    }
}

function checkPassword(password) {
    const requirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9@#$%^&+=]{8,20}$/;
    return requirements.test(password);
}

function normalizePasswordsAndLogin(){
    if (passwordInput.classList.contains('input-error')) {
        passwordInput.classList.remove('input-error');
    }
    passwordInput.placeholder = 'Пароль';
    repeatInput.placeholder = 'Повторите пароль'
    if (repeatInput.classList.contains('input-error')) {
        repeatInput.classList.remove('input-error');
    }
    if (loginInput.classList.contains('input-error')) {
        loginInput.classList.remove('input-error');
    }
}

