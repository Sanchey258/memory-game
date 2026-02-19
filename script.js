// Liste de tes images IA (une seule fois chaque)
// Tu peux en mettre moins ou plus, mais garde un nombre raisonnable (6–10)
const baseImages = [
    "images/waifu1.png",
    "images/waifu2.png",
    "images/waifu3.png",
    "images/waifu4.png",
    "images/waifu5.png",
    "images/waifu6.png",
    "images/waifu7.png",
    "images/waifu8.png"
];

const board = document.getElementById("game-board");
const movesSpan = document.getElementById("moves");
const matchesSpan = document.getElementById("matches");
const restartBtn = document.getElementById("restart-btn");
const winMessage = document.getElementById("win-message");
const finalMovesSpan = document.getElementById("final-moves");
const playAgainBtn = document.getElementById("play-again-btn");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let totalPairs = 0;

function initGame() {
    board.innerHTML = "";
    winMessage.classList.add("hidden");
    moves = 0;
    matches = 0;
    movesSpan.textContent = moves;
    matchesSpan.textContent = matches;

    // On choisit toutes les images (tu peux en prendre un sous-ensemble si tu veux)
    const selectedImages = [...baseImages];

    // On crée les paires
    cards = [...selectedImages, ...selectedImages];

    // Nombre total de paires
    totalPairs = selectedImages.length;

    // On mélange
    shuffle(cards);

    // On crée les cartes dans le DOM
    cards.forEach((imgSrc, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = imgSrc;

        const inner = document.createElement("div");
        inner.classList.add("card-inner");

        const front = document.createElement("div");
        front.classList.add("card-face", "card-front");
        front.textContent = "?";

        const back = document.createElement("div");
        back.classList.add("card-face", "card-back");
        const img = document.createElement("img");
        img.src = imgSrc;
        back.appendChild(img);

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.addEventListener("click", () => handleCardClick(card));

        board.appendChild(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleCardClick(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    moves++;
    movesSpan.textContent = moves;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matches++;
        matchesSpan.textContent = matches;
        resetTurn();

        if (matches === totalPairs) {
            showWin();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function showWin() {
    finalMovesSpan.textContent = moves;
    winMessage.classList.remove("hidden");
}

restartBtn.addEventListener("click", initGame);
playAgainBtn.addEventListener("click", initGame);

// Lancement initial
initGame();
