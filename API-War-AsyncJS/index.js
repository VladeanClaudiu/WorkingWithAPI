const generateDeckBtn = document.getElementById("generate-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardImageDiv = document.getElementById("card-img");
let deckId = null;
let playerScord = 0;
let computerScore = 0;
const cardValueArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

const  decideWinner = (plCard, compCard) => {
  let player = cardValueArr.indexOf(plCard);
  let comp = cardValueArr.indexOf(compCard)
  if(player === comp){
    console.log("Its a tie")
  }else if(player > comp){
    console.log("Player is the winner");
    playerScord++;

  }else{
    console.log("Computer is the winner")
    computerScore++;
  }
  console.log(`The score of the Comuter is: ${computerScore}
               The score of the Plyaer is: ${playerScord}`)
}



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
        }" alt="a image of a playing card the ${card.value + ' of ' + card.suit}">`;
      });
      decideWinner(data.cards[0].value, data.cards[1].value);
    });
};

//generates new deck
generateDeckBtn.addEventListener("click", fetchCards);

//draws cards from generated deck > does not allow draw is the deck is not generated yet
drawCardsBtn.addEventListener("click", () =>
  deckId === null ? alert("drawCards") : drawCards()
);
