const urlData = 'https://www.boredapi.com/api/activity'
const fetchActivityButton = document.getElementById('fetchActivity')


fetchActivityButton.innerText = 'New Activity'
fetchActivityButton.addEventListener('click', () => {
    
fetch(urlData)
.then(response => response.json())
.then(data => {document.getElementById('activity').textContent = `${data.activity}`})
})
