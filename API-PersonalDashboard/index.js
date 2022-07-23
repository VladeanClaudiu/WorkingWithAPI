const imageApiLink =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const cryptoApiLink = "https://api.coingecko.com/api/v3/coins/";
const photoAuthor = document.getElementById("author-info");
const cryptoInfo = document.getElementById("crypto-info");
const timeInfo = document.getElementById("time-section");
const cryptoIDs = ["bitcoin", "ethereum", "dogecoin"];

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not working");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

const resizeDash = () => {
  height = document.getElementById("dashboard").offsetHeight;
  width = document.getElementById("dashboard").offsetWidth;
  self.resizeTo(width + 20, height + 100);
};

const setTimeInfo = () => {
  const date = new Date();
  return date.toLocaleTimeString("en-us", { timeStyle: "short" });
};

const setTimeInfoHtml = () => {
  const time = setTimeInfo();
  timeInfo.innerHTML = `<p>${time}</p>`;
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

const getCryptoInfoHtml = (image, name, current, high, low) => {
  cryptoInfo.innerHTML += `
                          <div class="cryptoBlock" id="crypto-block">
                            <img src="${image}" alt="crypto-icon" />
                            <p class="cryptoName">${name}</p>
                            <div class="prices">
                              <p class="currentPrice">🎯: €${current}</p>
                              <p class="high24H">📈: €${high}</p>
                              <p class="low24H">📉: €${low}</p>
                            </div>
                          </div>
                        `;
};

const setCryptoInfo = (cryptoID) => {
  cryptoInfo.innerHTML = "";
  for (id of cryptoID) {
    const cryptoApiEndpoint = `${id}`;
    fetch(cryptoApiLink + cryptoApiEndpoint)
      .then((res) => {
        if (!res.ok) {
          throw Error("Coin not found!");
        }
        return res.json();
      })
      .then((data) => {
        let cryptoImageSrc = data.image.thumb;
        let cryptoName = data.name;
        //console.log(data.market_data.current_price.eur);
        let currentCryptoPrice = data.market_data.current_price.eur;
        let highCryptoPrice = data.market_data.high_24h.eur;
        let lowCryptoPrice = data.market_data.low_24h.eur;
        console.log(data.market_data);
        getCryptoInfoHtml(
          cryptoImageSrc,
          cryptoName,
          currentCryptoPrice,
          highCryptoPrice,
          lowCryptoPrice
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

setBackgroundImage();
setCryptoInfo(cryptoIDs);
setInterval(function () {
  setCryptoInfo(cryptoIDs);
}, 360000);
setTimeInfoHtml();
setInterval(setTimeInfoHtml, 60000);
