const imageApiLink =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const cryptoApiLink = "https://api.coingecko.com/api/v3/coins/";
const photoAuthor = document.getElementById("author-info");
const cryptoInfo = document.getElementById("crypto-info");
const cryptoIDs = ["bitcoin", "ethereum", "dogecoin", "hashasdhashd"];

const resizeDash = () => {
  height = document.getElementById("dashboard").offsetHeight;
  width = document.getElementById("dashboard").offsetWidth;
  self.resizeTo(width + 20, height + 100);
};

const setBackgroundImage = () => {
  fetch(imageApiLink)
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        throw Error("Error fetching Photo");
      }
      let link = data.urls.regular;
      let authorName = data.user.name;
      console.log(data);
      document.body.style.backgroundImage = `url(${link})`;
      photoAuthor.innerHTML = `<p class="authorName">By: ${authorName}</p>`;
    })
    .catch((err) => {
      console.error(err);
      document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTgyMzk1ODk&ixlib=rb-1.2.1&q=80&w=1080")`;
      photoAuthor.innerHTML = `<p class="authorName">By: Matt Hardy</p>`;
    });
};

const setCryptoInfo = (cryptoID) => {
  for (id of cryptoID) {
    const cryptoApiEndpoint = `${id}`;
    fetch(cryptoApiLink + cryptoApiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        throw Error("Test error");
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

setBackgroundImage();
setCryptoInfo(cryptoIDs);
