const generateDeckBtn = document.getElementById("generate-deck");
let deckId;

const fetchCards = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
};

generateDeckBtn.addEventListener("click", fetchCards);
