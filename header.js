const info = document.querySelector('#info');
const user = localStorage.getItem('user');
if (user !== undefined) {
    const newH2 = document.createElement('h2');
    newH2.textContent = `${user['name']} ${user['second_name']}`
    info.appendChild(newH2);
}