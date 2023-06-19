export function showModalWindow(message, code){
    const modal = document.getElementById("error-window");
    const modalMessage = document.getElementById("error-window-message");
    const modalClose = document.getElementById("error-window-close");
    modal.style.display = "block";
    modalMessage.innerHTML = (code === 200) ? `Ошибка: ${message}` : "Так просто не убежите." ;
    modalClose.addEventListener("click", function() {
        modal.style.display = "none";
    });
}