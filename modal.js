export function createModal(message, isTerminal = false, location = ''){
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    modal.setAttribute("class", "modal");
    modal.classList.add('modal');

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement("span");
    closeButton.setAttribute("class", "close");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add('close');
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
        if (isTerminal) {
            window.location.href = '../main_page/hub.html'
        }
    });

    const modalText = document.createElement("p");
    modalText.textContent = message;

    modalContent.appendChild(modalText);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = "flex";
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            if (isTerminal) {
                window.location.href = '../main_page/hub.html'
            }
        }
    });
}



