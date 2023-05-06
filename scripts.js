const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'admin' && password === 'password') { //TODO: заменить на проверку в базе данных
        alert('Вход выполнен успешно!');
    } else {
        alert('Неправильные имя пользователя или пароль.');
        usernameInput.classList.add('error');
        passwordInput.classList.add('error');
    }
});

usernameInput.addEventListener('input', function() {
    usernameInput.classList.remove('error');
});

passwordInput.addEventListener('input', function() {
    passwordInput.classList.remove('error');
});