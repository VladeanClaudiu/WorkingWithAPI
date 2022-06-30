//declaring constant variables
const apiUrlHead = 'https://www.thecolorapi.com'
const schemesOptions = document.getElementById('schemes');
const colorBody = document.getElementById('appBody');
const colorFooter = document.getElementById('appFooter');
const colorPicker = document.getElementById('color-picker')
const sumbitBtn = document.getElementById('sumbit-scheme')


//fetch to the api
// fetch('https://www.thecolorapi.com/id?rgb=rgb(0,71,171)')
//     .then(resp => resp.json())
//     .then(data => console.log(data))

//app render function

const renderApp = () => {
    //rendering headder of app
    colorBody.innerHTML = `
                            <div class="color-1"></div>
                            <div class="color-2"></div>
                            <div class="color-3"></div>
                            <div class="color-4"></div>
                            <div class="color-5"></div>
                            `
    colorFooter.innerHTML = `
                            <div class="color-1-hex">
                                <p>#ffffff</p>
                            </div>
                            <div class="color-2-hex">
                                <p>#ffffff</p>
                            </div>
                            <div class="color-3-hex">
                                <p>#ffffff</p>
                            </div>
                            <div class="color-4-hex">
                                <p>#ffffff</p>
                            </div>
                            <div class="color-5-hex">
                                <p>#ffffff</p>
                            </div>
                             `
                            
}


sumbitBtn.addEventListener('click', () => {
    console.log(schemesOptions.value)
    console.log(colorPicker.value)
})

renderApp();


