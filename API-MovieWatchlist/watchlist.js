const apiKey = "c8ea3645";
let searchTerm = "Movie Name";
let watchListArr = [];
const movieLocalStorage = JSON.parse(localStorage.getItem("Movie"));
setArrayLocalSotage();
//html id declarations
const mainHtmlList = document.getElementById("main-content-list");

function setArrayLocalSotage() {
  watchListArr = JSON.parse(localStorage.getItem("Movie"));
}

console.log(localStorage.getItem("Movie"));

function replaceButton() {
  const watchLaterButtonS = document.querySelectorAll(".watchLater");
  for (button of watchLaterButtonS) {
    button.textContent = "Remove";
    button.classList.add("removeStyle");
  }
}

function renderList() {
  mainHtmlList.innerHTML = "";
  console.log(movieLocalStorage);
  if (watchListArr.length > 0) {
    movieLocalStorage.map((item) => {
      mainHtmlList.innerHTML += item;
    });
  } else {
    mainHtmlList.innerHTML = `
    <div class="postSearchText unableToFind">
      <h3>Add some Movies to your list</h3>
    </div>
    `;
  }

  let testID = replaceButton();
  console.log(testID);
  //localStorage.clear();
}

renderList();
