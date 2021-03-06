const generateDeckBtn = document.getElementById("generate-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardImageDiv = document.getElementById("card-img");
const winingCardHead = document.getElementById("winning-card");
const cardsRemaining = document.getElementById("cards-remaining");
const yourScore = document.getElementById("your-score");
const computerScore = document.getElementById("computer-score");

let deckId = null;
let plScore = 0;
let compScore = 0;
let cardsLeft = true;

const decideWinner = (plCard, compCard) => {
  const cardValueArr = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  let player = cardValueArr.indexOf(plCard.value);
  let comp = cardValueArr.indexOf(compCard.value);
  if (player === comp) {
    return "War!";
  } else if (player > comp) {
    plScore++;
    return "You win!";
  } else {
    compScore++;
    return "Computer is the winner!";
  }
};

//fetches newe deck
const fetchCards = async () => {
  drawCardsBtn.disabled = false;
  cardsLeft = true;
  plScore = 0;
  compScore = 0;
  cardImageDiv.innerHTML = `<div class="image-placeholder"></div>
                            <div class="image-placeholder"></div>`;

  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  console.log(data);
  deckId = data.deck_id;
  winingCardHead.textContent = "Draw Cards";
  cardsRemaining.textContent = `Cards Remaining in the deck: ${data.remaining}`;
};

//draws two cards from the deck fetched by the fetchCards func
const drawCards = async () => {
  cardImageDiv.innerHTML = ``;
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck//${deckId}/draw/?count=2`
  );
  const data = await res.json();
  console.log(data);
  data.cards.map((card) => {
    cardImageDiv.innerHTML += `<img src="${
      card.image
    }" alt="a image of a playing card the ${card.value + " of " + card.suit}">`;
  });

  winingCardHead.textContent = decideWinner(data.cards[0], data.cards[1]);
  yourScore.innerHTML = `<h4>You: ${plScore}</h4>`;
  computerScore.innerHTML = `<h4>Computer: ${compScore}</h4>`;
  cardsRemaining.textContent = `Cards Remaining in the deck: ${data.remaining}`;
  if (data.remaining === 0) {
    drawCardsBtn.disabled = true;
    if (plScore > compScore) {
      winingCardHead.textContent = "You Win the War!!!";
    } else if (plScore < compScore) {
      winingCardHead.textContent = "Computer Wins the War!!!";
    } else {
      winingCardHead.textContent = "It's a Tie!!!";
    }
  }
};

//generates new deck
generateDeckBtn.addEventListener("click", fetchCards);

//draws cards from generated deck > does not allow draw is the deck is not generated yet
drawCardsBtn.addEventListener("click", () => {
  deckId === null ? alert("drawCards") : drawCards();
});
