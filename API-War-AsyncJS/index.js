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

  // testing if score count works
  // console.log(`The score of the Comuter is: ${computerScore}
  //              The score of the Plyaer is: ${playerScord}`)
};

const fetchCards = () => {
  plScore = 0;
  compScore = 0;
  cardImageDiv.innerHTML = `<div class="image-placeholder"></div>
                            <div class="image-placeholder"></div>`;
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      winingCardHead.textContent = "Draw Cards";
      cardsRemaining.textContent = `Cards Remaining in the deck: ${data.remaining}`;
    });
};

const drawCards = () => {
  cardImageDiv.innerHTML = ``;
  fetch(
    `https://apis.scrimba.com/deckofcards/api/deck//${deckId}/draw/?count=2`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.remaining === 0) {
        cardsLeft = false;
      }
      console.log(data);
      data.cards.map((card) => {
        cardImageDiv.innerHTML += `<img src="${
          card.image
        }" alt="a image of a playing card the ${
          card.value + " of " + card.suit
        }">`;
      });
      winingCardHead.textContent = decideWinner(data.cards[0], data.cards[1]);
      yourScore.innerHTML = `<h4>You: ${plScore}</h4>`;
      computerScore.innerHTML = `<h4>Computer: ${compScore}</h4>`;
      cardsRemaining.textContent = `Cards Remaining in the deck: ${data.remaining}`;
    });
};

//generates new deck
generateDeckBtn.addEventListener("click", fetchCards);

//draws cards from generated deck > does not allow draw is the deck is not generated yet
drawCardsBtn.addEventListener("click", () => {
  if (cardsLeft === true) {
    deckId === null ? alert("drawCards") : drawCards();
  } else {
    drawCardsBtn.disabled = true;
    if (plScore > compScore) {
      winingCardHead.textContent = "You Win the War!!!";
    } else {
      winingCardHead.textContent = "Computer Wins the War!!!";
    }
  }
});
