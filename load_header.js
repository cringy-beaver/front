document.addEventListener("DOMContentLoaded", function() {
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            const headerDiv = document.getElementById('header');
            headerDiv.innerHTML = data;

            const info = headerDiv.querySelector('#info');
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.name && user.second_name) {
                const newParagraph = document.createElement('p');
                newParagraph.textContent = `${user.name} ${user.second_name}`;
                info.appendChild(newParagraph);
            }
        });
});
