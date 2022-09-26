var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";
var infoAside = document.querySelector('.info')
var homeBtn = document.querySelector('#home')
var colorBtns = document.querySelectorAll('.color-btn')
var colorDiv = document.querySelector('#color-div')
var pathName = window.location.pathname;
var pageArray = pathName.split("/");
var page = pageArray[pageArray.length - 1]
console.log(page);

// calls data of artwork from the api but all it really does right now is append their titles to the display page


//append title function works but throws error on index.html because it's not appending to that page
function appendTitle (artData) {
    artData.forEach((art) => {
    var titleEl = document.createElement('h3')
    titleEl.innerText = art.title
    infoAside.appendChild(titleEl);
    });
};


function returnHome () {
    page = 'index.html';
    document.location = './index.html'
    console.log('this is return home function')
};

function btnHandler() { 
    page = 'diplay.html';
    document.location = './display.html'
    console.log('this is btnHandler fucnction')
};

if (page == 'index.html') {
colorDiv.addEventListener('click', btnHandler);

} else {
    fetch(chicagoArtApi)
.then (response => response.json())
.then(({ data }) => appendTitle(data));
    homeBtn.addEventListener('click', returnHome);

}

