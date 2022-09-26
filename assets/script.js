//to be added
var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";
var infoAside = document.querySelector('.info')
var homeBtn = document.getElementById('home')
var colorBtns = document.querySelectorAll('.color-btn')
var colorDiv = document.getElementById('color-div')


console.log(colorBtns)
// calls data of artwork from the api but all it really does right now is append their titles to the display page
fetch(chicagoArtApi)
.then (response => response.json())
.then(({ data }) => appendTitle(data));
//append title function works but throws error on index.html because it's not appending to that page
const appendTitle = (artData) => {
    artData.forEach((art) => {
    var titleEl = document.createElement('h3')
    titleEl.innerText = art.title
    infoAside.appendChild(titleEl);
    });
};


function returnHome () {
    document.location = './index.html'
};

function btnHandler() {
    document.location = './display.html'
};


homeBtn.addEventListener('click', returnHome);//works but throws error on index.html
colorDiv.addEventListener('submit', console.log(click));//doesn't work
