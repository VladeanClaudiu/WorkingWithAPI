const apiLink =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const photoAuthor = document.getElementById("author-info");

const setBackgroundImage = () => {
  fetch(apiLink)
    .then((res) => res.json())
    .then((data) => {
      let link = data.urls.regular;
      let authorName = data.user.name;
      console.log(data);
      document.body.style.backgroundImage = `url(${link})`;
      photoAuthor.innerHTML = `<p class="authorName">By: ${authorName}</p>`;
    });
};

setBackgroundImage();
