const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close");

for (let question of document.getElementsByClassName("question")) {
    question.onclick = function() {
        document.getElementById("question-name").innerText = question.getElementsByClassName("ticket-name")[0].innerText;
        document.getElementById("question-img").src = question.getElementsByTagName("img")[0].src;
        modal.style.display = "block";
        overlay.style.display = "block";
    }
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
    overlay.style.display = "none";
}

// window.onclick = function(event) {
//   if (event.target == overlay) {
//     modal.style.display = "none";
//     overlay.style.display = "none";
//   }
// }
