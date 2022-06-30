//declaring constant variables
const apiUrlHead = 'https://www.thecolorapi.com'
const schemesOptions = document.getElementById('schemes');
const colorBody = document.getElementById('appBody');
const colorFooter = document.getElementById('appFooter');
const colorPicker = document.getElementById('color-picker')
const sumbitBtn = document.getElementById('sumbit-scheme')


const fetchFunction = () => {
    const regEx = /\w+/g
    let colorScheme = schemesOptions.value;
    let colorPickerHex = regEx.exec(colorPicker.value);
    console.log(colorPickerHex)

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPickerHex}&mode=${colorScheme}&count=5`)
    .then(res => res.json())
    .then(data => {
        let dataArrayColors = data.colors;
        for(let i = 0; i < dataArrayColors.length; i++){
            renderHtml(dataArrayColors[i].hex.value, i+1)
        }
    })
}


const renderHtml = (hexValue) => {
    colorFooter.innerHTML += `
    <div class="color-hex">
        <p onclick='getHexCode("${hexValue}")'>${hexValue}</p>
    </div>
    `
    colorBody.innerHTML +=`
    <div style='background-color: ${hexValue}'"></div>  
    `

}

sumbitBtn.addEventListener('click', () => {
    //reset the html for the color Footer
    colorFooter.innerHTML = ''
    colorBody.innerHTML = ''
   fetchFunction();
})

//copy hexcode to clipboard
function getHexCode(valueHex) {
    const body = document.querySelector('body');
    let hex = valueHex;
    let hexCopy = document.createElement('textarea');
    body.appendChild(hexCopy)
    hexCopy.value = hex;
    hexCopy.select();
    document.execCommand('copy');
    alert('Hex copied:  ' + hex)
    body.removeChild(hexCopy);
}

fetchFunction();




