const apiKey = "c8ea3645";
let searchTerm = "Movie Name";
let watchListArr = [];
const movieLocalStorage = JSON.parse(localStorage.getItem("Movie"));
setArrayLocalSotage();

//html id declarations
const searchMovieInput = document.getElementById("search");
const searchBtn = document.getElementById("search-movie");
const mainHtml = document.getElementById("main-content");

// sets the array equal to local storage
function setArrayLocalSotage() {
  watchListArr = JSON.parse(localStorage.getItem("Movie"));
}

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
          <button class="watchLater" id="watchLater" onclick="addToWatchlist(${id})">Watchlist</button>
          <p class="synopsisParagraph">
              ${synopsis}
          </p>
      </div>
  </div>
`;
}

const getPoster = async (value) => {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${value}&apikey=${apiKey}`
  );
  const data = await res.json();
  let dataArray = data.Search;
  if (dataArray != undefined) {
    console.log(dataArray);
    const movieID = dataArray.map(async (movie) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
      );
      const data = res.json();
      return data;
    });
    console.log(movieID);
    return movieID;
  }
};

searchBtn.addEventListener("click", async () => {
  searchTerm = searchMovieInput.value;
  mainHtml.innerHTML = "";
  let returnData = await getPoster(searchTerm);
  console.log(returnData);
  if (returnData != undefined) {
    returnData.map(async (item) => {
      const itemValue = await item;
      console.log(itemValue);

      mainHtml.innerHTML += setMovieHtml(
        itemValue.imdbID,
        itemValue.Poster,
        itemValue.Title,
        itemValue.Ratings[0].Value,
        itemValue.Runtime,
        itemValue.Genre,
        itemValue.Plot
      );
    });
  } else {
    mainHtml.innerHTML = ``;
    mainHtml.innerHTML = `
                          <div class="postSearchText unableToFind">
                            <h3>Unable to find what youre looking for. Please try another search.</h3>
                          </div>
                          `;
  }
});

//adding to local storage
function addToWatchlist(id) {
  console.log(id);
  let test = id.outerHTML;

  watchListArr.push(test);
  console.log(watchListArr);
  localStorage.setItem("Movie", JSON.stringify(watchListArr));
}
console.log(localStorage.getItem("Movie"));
