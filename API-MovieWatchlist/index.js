const apiKey = "c8ea3645";
let searchTerm = "";

const getPoster = async () => {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
  );
  const data = await res.json();
  console.log(data);
};
