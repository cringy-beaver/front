const SERVER = 'http://exam4u.site:5001';

export async function updateToken(){
    const now = Date();
    const start = new Date(localStorage.getItem('time_create').replace(' ', 'T'));
    const delta = Math.abs(now - start) / 1000;
    if (delta > localStorage.getItem('ttl')) {
        await fetch(`${SERVER}/update_token?token=${localStorage.getItem('token')}`, {
            method: 'POST',
        }).then(async function(response){
            if (response.status === 200){
                const responseJSON = await response.json()
                localStorage.setItem('token', responseJSON.access_token);
                localStorage.setItem('ttl', responseJSON.ttl);
                localStorage.setItem('time_create', responseJSON.time_create);
                localStorage.setItem('user', JSON.stringify(responseJSON.user))
            } else if (response.status === 401 || response.status === 500) {
                alert(response.error)
            }
        }).catch(error => {
            alert(error.code)
        })
    }
}

export function checkToken(){
    const checkKeys = ['token', 'ttl', 'time_create', 'user']
    for (const key of checkKeys) {
        if (!localStorage.getItem(key)) {
            window.location.href = '../main_page/main_page.html';
        }
    }
}