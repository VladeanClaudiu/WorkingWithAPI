const apiKey = "c8ea3645";
let searchTerm = "Movie Name";

//html id declarations
const searchMovieInput = document.getElementById("search");
const searchBtn = document.getElementById("search-movie");
let mainHtml = document.getElementById("main-content");

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
          <button class="watchLater">Watchlist</button>
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
  let dataArray = await data.Search;
  console.log(dataArray);
  const movieID = await dataArray.map(async (movie) => {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
    );
    const data = await res.json();
    return await data;
  });
  console.log(movieID);
  return await movieID;
};

searchBtn.addEventListener("click", async () => {
  searchTerm = searchMovieInput.value;
  mainHtml.innerHTML = "";
  let returnData = await getPoster(searchTerm);
  returnData.map(async (item) => {
    const itemValue = await item;
    console.log(itemValue);
    mainHtml.innerHTML += await setMovieHtml(
      await itemValue.imdbID,
      await itemValue.Poster,
      await itemValue.Title,
      await itemValue.Ratings[0].Value,
      await itemValue.Runtime,
      await itemValue.Genre,
      await itemValue.Plot
    );
  });
});
