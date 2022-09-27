var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";
var infoAside = document.querySelector('.info')
var homeBtn = document.querySelector('#home')
var colorBtns = document.querySelectorAll('.color-btn')
var colorDiv = document.querySelector('#color-div')
var pathName = window.location.pathname;
var pageArray = pathName.split("/");
var page = pageArray[pageArray.length - 1]
var artEl = document.querySelector('.art')
var nextBtn = document.querySelector('#next')
var prevBtn = document.querySelector('#prev')
var imgIndex = 0

console.log(imgIndex)
console.log(page);

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
};

function btnHandler() { 
    page = 'diplay.html';
    document.location = './display.html'
};

function imgHandler(imgData) {
    var imgUrl = 'https://www.artic.edu/iiif/2/' + imgData[2].image_id + '/full/843,/0/default.jpg'
    var imgEl = document.createElement('img')
    imgEl.src = imgUrl
    artEl.appendChild(imgEl)
};

function next () {
    if (imgIndex < 13) {
        imgIndex++
    }
};
function prev () {
    if (imgIndex > 0) {
        imgIndex--
    }
};

if (page == 'index.html') {
    colorDiv.addEventListener('click', btnHandler);

} else {
    fetch(chicagoArtApi)
    .then (response => response.json())
    .then(({ data }) => {
        appendTitle(data)
        imgHandler(data)
        console.log(data)
        console.log(data[0].image_id)
    });

    homeBtn.addEventListener('click', returnHome);

};

if (page == 'display.html') {
    nextBtn.addEventListener('click', next)
}