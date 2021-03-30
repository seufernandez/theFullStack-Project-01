const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll("#play")//pega todos com a classe card

var video
for (let card of cards) {
    card.addEventListener("click", function(){
        const videoId = card.getAttribute("title");//pegando id
        
        window.location.href = `/video?id=${videoId}` // quando clicar o js vai mandar o usuário pra página do video correto
    });
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""


});


