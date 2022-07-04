const generateDeckBtn = document.getElementById("generate-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardImageDiv = document.getElementById("card-img");
let deckId = null;

const fetchCards = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
};

const drawCards = () => {
  cardImageDiv.innerHTML = "";
  fetch(
    `https://apis.scrimba.com/deckofcards/api/deck//${deckId}/draw/?count=2`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.cards.map((card) => {
        cardImageDiv.innerHTML += `<img src="${
          card.image
        }" alt="a image of a playing card the ${card.value + card.suit}">`;
      });
    });
};

//generates new deck
generateDeckBtn.addEventListener("click", fetchCards);

//draws cards from generated deck > does not allow draw is the deck is not generated yet
drawCardsBtn.addEventListener("click", () =>
  deckId === null ? alert("drawCards") : drawCards()
);
