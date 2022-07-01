const generateDeckBtn = document.getElementById('generate-deck');

generateDeckBtn.addEventListener('click', () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => console.log(data));
})