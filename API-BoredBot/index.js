const urlData = 'https://www.boredapi.com/api/activity'
const fetchActivityButton = document.getElementById('fetchActivity')


fetchActivityButton.innerText = 'New Activity'
fetchActivityButton.addEventListener('click', () => {
    //only makes the button visible when the function is invoked
// document.querySelector('.whereActivity').style.display = 'block'
fetch(urlData)
.then(response => response.json())
.then(data => {
    console.log(data)
    document.getElementById('activity').textContent = `${data.activity}`
    document.querySelector('.whereActivity').innerHTML = `
                                            <a id="where-activity" href="${data.link === '' ? '#' : data.link}" target="_blank">Explain</a>
                                            `
})
})
