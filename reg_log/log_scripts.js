const SERVER = 'http://exam4u.ru:5001'

const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    let login = formData.get('text-login')
    let password = formData.get('password-login')

    await fetch(`${SERVER}/signin?login=${login}&password=${password}&redirect_url=http://localhost:63342/front/exam_room/student.html?_ijt=b3kf9ltthijg6rf6rkmfh3n9mj}`, {
        method: 'POST',
    }).then(response => {
        if (response.redirected){
            debugger;
            const resp = response.json()
            document.cookie = `token=${resp.access_token}; ttl=${resp.time_left};`;
            window.location.href = response.url;
        } else if (response.status === 401 || response.status === 402) {
            const inputs = document.querySelectorAll('#loginForm input')
            for (let input of inputs){
                input.classList.add('input-error')
            }
            inputs[1].placeholder = 'Неверный логин или пароль'
            inputs[1].value = ''
        }
    }).catch(error => {
       alert(error.code) // TODO: логирование ошибок
    })
    // let result = await response.json()
    // if (result.code === 303) {
    //
    //
    // } else if (result.code === 401) {
    //     const inputs = document.querySelectorAll('#loginForm input')
    //     for (let input of inputs){
    //         input.classList.add('input-error')
    //     }
    //     inputs[1].placeholder = 'Неверный логин или пароль'
    //     inputs[1].value = ''
    // }
});