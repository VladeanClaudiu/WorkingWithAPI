const urlDogAPI = 'https://dog.ceo/api/breeds/image/random'

fetch(urlDogAPI)
.then(response => response.json())
.then(data => document.querySelector('.image-div').innerHTML = `
    <img src='${data.message}' />
`)