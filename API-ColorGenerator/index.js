//declaring constant variables
const apiUrlHead = 'https://www.thecolorapi.com'


//fetch to the api
fetch('https://www.thecolorapi.com/id?rgb=rgb(0,71,171)')
    .then(resp => resp.json())
    .then(data => console.log(data))