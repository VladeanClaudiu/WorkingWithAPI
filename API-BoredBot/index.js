
fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.querySelector('.image-div').innerHTML = `
        <img src="${data.message}"/>
        `
    })


