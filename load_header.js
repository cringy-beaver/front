document.addEventListener("DOMContentLoaded", function() {
    fetch('/front/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            const exitBtn = document.querySelector("#exit");
            exitBtn.addEventListener('click', clearLocalStorage)
            const info = document.querySelector('#info');
            const user = JSON.parse(localStorage.getItem('user'));
            if (user !== undefined) {
                const newH2 = document.createElement('h2');

                newH2.classList.add('initials')
                newH2.textContent = `${user['name']} ${user['second_name']}`
                info.insertBefore(newH2, info.firstChild);
            }
        });
});

function clearLocalStorage(){
    localStorage.clear();
    window.location.href = '/front/reg_log/login.html';
}