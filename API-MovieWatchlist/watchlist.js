const apiKey = "c8ea3645";
let searchTerm = "Movie Name";
const watchListArr = [];
const movieLocalStorage = JSON.parse(localStorage.getItem("Movie"));

//html id declarations
const mainHtmlList = document.getElementById("main-content-list");

console.log(localStorage.getItem("Movie"));

function replaceButton() {
  const watchLaterButton = document.querySelector(".watchLater");
  watchLaterButton.classList.add("removeEl");
}

function renderList() {
  mainHtmlList.innerHTML = "";
  console.log(movieLocalStorage);
  movieLocalStorage.map((item) => {
    mainHtmlList.innerHTML += item;
  });
  let testID = replaceButton();
  console.log(testID);
}

renderList();
