const requestPlace = document.getElementById('request-place');

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => console.log(data))