document.addEventListener("DOMContentLoaded", function() {
    fetch('/front/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            const exitBtn = document.querySelector("#exit");
            exitBtn.addEventListener('click', clearLocalStorage);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user !== undefined) {
                document.querySelector('#full_name').textContent = `${user['name']} ${user['second_name']}`;
            }
        });
});

function clearLocalStorage(){
    localStorage.clear();
    window.location.href = '/front/reg_log/login.html';
}