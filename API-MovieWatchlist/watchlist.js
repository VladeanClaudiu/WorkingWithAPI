const apiKey = "c8ea3645";
const mainHtmlList = document.getElementById("main-content-list");
let searchTerm = "Movie Name";
let movieSearchArray = [];
let watchListArr = [];
if (localStorage.getItem("WatchList") !== null) {
  watchListArr = JSON.parse(localStorage.getItem("WatchList"));
  console.log(watchListArr);
}

//add to watchlist function
function removeFromWatchList(movieID) {
  let movieIDTest = movieID.getAttribute("id");
  let watchedFilms = watchListArr.filter((movie) => {
    if (movie.id != movieIDTest) {
      return movie;
    }
  });
  watchListArr = watchedFilms;
  localStorage.setItem("WatchList", JSON.stringify(watchListArr));
  renderMovieSearch();
}

const renderMovieSearch = () => {
  mainHtmlList.innerHTML = "";
  watchListArr.map((movie) => {
    mainHtmlList.innerHTML += setMovieHtml(
      movie.id,
      movie.poster,
      movie.title,
      movie.rating,
      movie.runtime,
      movie.genre,
      movie.plot
    );
  });
};

function setMovieHtml(id, poster, title, rating, runtime, genre, synopsis) {
  return `
    <div class="movieEl" id="${id}">
        <img
        class="moviePoster"
        src="${poster}"
        alt="image of a poster"
        />
        <div class="movieTitle">
            <h4>${title}</h4>
            <p>⭐${rating}</p>
        </div>
        <div class="movieInfo">
            <h5 class="runtime">${runtime}</h5>
            <h5 class="genre">${genre}</h5>
            <button class="watchLaterAdded removeStyle" id="removeBtn" onclick="removeFromWatchList(${id})">Remove</button>
            <p class="synopsisParagraph">
                ${synopsis}
            </p>
        </div>
    </div>
  `;
}

function renderList() {
  if (watchListArr.length > 0) {
    renderMovieSearch();
  } else {
    mainHtmlList.innerHTML = `
    <div class="postSearchText unableToFind">
      <h3>Add some Movies to your list</h3>
    </div>
    `;
  }
}

renderList();
