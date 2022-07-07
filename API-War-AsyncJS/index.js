const generateDeckBtn = document.getElementById("generate-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardImageDiv = document.getElementById("card-img");
const winingCardHead = document.getElementById("winning-card");
const cardsRemaining = document.getElementById("cards-remaining");

let deckId = null;
let playerScord = 0;
let computerScore = 0;

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
    playerScord++;
    return "You win!";
  } else {
    computerScore++;
    return "Computer is the winner!";
  }

  // testing if score count works
  // console.log(`The score of the Comuter is: ${computerScore}
  //              The score of the Plyaer is: ${playerScord}`)
};

const fetchCards = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      winingCardHead.textContent = "Draw Cards";
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
        }" alt="a image of a playing card the ${
          card.value + " of " + card.suit
        }">`;
      });
      winingCardHead.textContent = decideWinner(data.cards[0], data.cards[1]);
      cardsRemaining.textContent = `Cards Remaining in the deck: ${data.remaining}`;
    });
};

//generates new deck
generateDeckBtn.addEventListener("click", fetchCards);

//draws cards from generated deck > does not allow draw is the deck is not generated yet
drawCardsBtn.addEventListener("click", () =>
  deckId === null ? alert("drawCards") : drawCards()
);
