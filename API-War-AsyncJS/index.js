const generateDeckBtn = document.getElementById("generate-deck");

const fetchCards = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

generateDeckBtn.addEventListener("click", fetchCards);

const people = [
  { name: "Jack", hasPet: true },
  { name: "Jill", hasPet: false },
  { name: "Alice", hasPet: true },
  { name: "Bob", hasPet: false },
];

function filterPet(value) {
  return value.hasPet;
}

function filterArray(array, callback) {
  const resultArray = [];
  for (let item of array) {
    const callbackIncluded = callback(item);
    if (callbackIncluded) {
      resultArray.push(item);
    }
  }
  return resultArray;
}

const filterArrayVaiableTest = filterArray(people, (person) => person.hasPet);

console.log(filterArrayVaiableTest);

//repo test
