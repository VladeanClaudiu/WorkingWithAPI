const urlData = 'https://www.boredapi.com/api/activity'

fetch(urlData)
.then(response => response.json())
.then(data => document.getElementById('idea').innerHTML = `${data.activity}`)