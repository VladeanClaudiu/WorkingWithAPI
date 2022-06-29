//declaring constant variables
const apiUrlHead = 'https://www.thecolorapi.com'
const colorHead = document.getElementById('appHead');
const colorBody = document.getElementById('appBody');
const colorFooter = document.getElementById('appFooter')

//fetch to the api
// fetch('https://www.thecolorapi.com/id?rgb=rgb(0,71,171)')
//     .then(resp => resp.json())
//     .then(data => console.log(data))

//app render function

const renderApp = () => {
    //rendering headder of app
    colorHead.innerHTML = `
                            <input type="color" name="color-picker" id="color-picker">
                            <select name="schemes" id="schemes">
                                <option value="test">test</option>
                                <option value="test">test</option>
                                <option value="test">test</option>
                                <option value="test">test</option>
                            </select>
                            <button>Get color scheme</button>
                            `;

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

renderApp();

