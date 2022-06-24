const urlData = 'https://apis.scrimba.com/bored/api/activity'

fetch(urlData)
.then(response => response.json())
.then(data => document.getElementById('idea').innerHTML = `${data.activity}`)