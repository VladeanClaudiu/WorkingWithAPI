const apiKey = "c8ea3645";
let searchTerm = "Movie Name";

//html id declarations
const searchMovieInput = document.getElementById("search");
const searchBtn = document.getElementById("search-movie");
const mainHtml = document.getElementById("main-content");

let movieEl = `
            <div class="movieEl">
                <img
                class="moviePoster"
                src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
                alt="image of something"
                />
                <div class="movieTitle">
                    <h4>Guardians of the Galaxy</h4>
                    <p>🍅81%</p>
                </div>
                <div class="movieInfo">
                    <h5 class="runtime">120 min</h5>
                    <h5 class="genre">Action, Drama, Sci-Fi</h5>
                    <button class="watchLater">Watchlist</button>
                    <p class="synopsisParagraph">
                        The Guardians struggle to keep together as a team while dealing
                        with their personal family issues, notably Star-Lord's encounter
                        with his father the ambitious celestial being Ego.
                    </p>
                </div>
            </div>
`;

const getPoster = async (value) => {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${value}&apikey=${apiKey}`
  );
  const data = await res.json();
  const movies = data.map((dataId) => {
    fetch(`http://www.omdbapi.com/?i=${dataId.imdbID}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
};

searchBtn.addEventListener("click", () => {
  searchTerm = searchMovieInput.value;
  getPoster(searchTerm);
});
