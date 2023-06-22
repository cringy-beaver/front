document.addEventListener("DOMContentLoaded", function() {
    fetch('/front/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
});
