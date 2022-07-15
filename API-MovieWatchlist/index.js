const apiKey = "c8ea3645";
let searchTerm = "Movie Name";
let movieSearchArray = [];
let watchListArr = [];
if (localStorage.getItem("WatchList") !== null) {
  watchListArr = JSON.parse(localStorage.getItem("WatchList"));
  console.log(watchListArr);
}

//html id declarations
const searchMovieInput = document.getElementById("search");
const searchBtn = document.getElementById("search-movie");
const mainHtml = document.getElementById("main-content");

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

//fetches data with the named value
const getPoster = async (value) => {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${value}&apikey=${apiKey}`
  );
  const data = await res.json();
  let dataArray = data.Search;
  if (dataArray != undefined) {
    console.log(dataArray);
    //map through all search results and fetches the movies data using the imdbID from the previous fetch request
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
  //clearing movie search array
  movieSearchArray = [];
  searchTerm = searchMovieInput.value;
  mainHtml.innerHTML = "";
  let returnMovieData = await getPoster(searchTerm);
  console.log(returnMovieData);
  //if the returned data from the database is not undefined
  if (returnMovieData != undefined) {
    returnMovieData.map(async (item) => {
      const itemValue = await item;
      //creating a movie object for each movie
      const movie = {
        id: itemValue.imdbID,
        poster: itemValue.Poster,
        title: itemValue.Title,
        rating: itemValue.Ratings[0].Value,
        runtime: itemValue.Runtime,
        genre: itemValue.Genre,
        plot: itemValue.Plot,
      };
      //adding new object to a search array
      movieSearchArray.push(movie);

      mainHtml.innerHTML += setMovieHtml(
        movie.id,
        movie.poster,
        movie.title,
        movie.rating,
        movie.runtime,
        movie.genre,
        movie.plot
      );
    });
    //if the returned data is undefined
  } else {
    mainHtml.innerHTML = ``;
    mainHtml.innerHTML = `
                          <div class="postSearchText unableToFind">
                            <h3>Unable to find what youre looking for. Please try another search.</h3>
                          </div>
                          `;
  }

  console.log(movieSearchArray);
});

//add to watchlist function
function addToWatchlist(movieID) {
  //gets the id of the movie clicked
  let movieIDTest = movieID.getAttribute("id");
  //goes through the list of movies searched for, matches id's and adds the object to the watch list array
  for (item of movieSearchArray) {
    if (item.id === movieIDTest && !watchListArr.includes(item)) {
      watchListArr.push(item);
    } else {
      console.log("Failed to add to list, already added");
    }
  }
  localStorage.setItem("WatchList", JSON.stringify(watchListArr));

  console.log(watchListArr);
}

//checks if the movie is already added to watchList
function checkMovieID(movieID) {}
