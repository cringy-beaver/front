// export function showModalWindow(message, code){
//     const modal = document.getElementById("error-window");
//     const modalMessage = document.getElementById("error-window-message");
//     const modalClose = document.getElementById("error-window-close");
//     modal.style.display = "block";
//     modalMessage.innerHTML = (code === 200) ? `Ошибка: ${message}` : "Так просто не убежите." ;
//     modalClose.addEventListener("click", function() {
//         modal.style.display = "none";
//     });
// }

/**
 * Show the modal window with a specified message and code
 * @param {string} message - The message to display in the modal window
 * @param {number} code - The status code
 */
export function showModalWindow(message, code){
    const modal = document.querySelector("#error-window");
    const modalMessage = document.querySelector("#error-window-message");
    const modalClose = document.querySelector("#error-window-close");

    modal.style.display = "block";
    modalMessage.textContent = (code === 200) ? `Ошибка: ${message}` : "Так просто не убежите." ;

    const closeModal = function() {
        modal.style.display = "none";
        modalClose.removeEventListener("click", closeModal);
        window.removeEventListener('keydown', onEscapeKeyDown);
    };

    const onEscapeKeyDown = function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    modalClose.addEventListener("click", closeModal);
    window.addEventListener('keydown', onEscapeKeyDown);
}
