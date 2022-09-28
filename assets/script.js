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
var artTypeEL = document.querySelector('#type')
var artistEL = document.querySelector('#artist')
var titleEL = document.querySelector('#title')
var artDataArray;
var imgIndex = 0;


console.log(page);

//to do: change appendTitle to display one title at a time and additional informationn about the artwork depicted.
function appendTitle () {
    titleEL.innerText = artDataArray[imgIndex].title
    artistEL.innerText = artDataArray[imgIndex].artist_title
    artTypeEL.innerText = artDataArray[imgIndex].artwork_type_title
};


function returnHome () {
    page = 'index.html';
    document.location.pathname = '/index.html'
};

function btnHandler() { 
    page = 'diplay.html';
    document.location.pathname = '/display.html'
};

function imgHandler() {
    var imgId = artDataArray[imgIndex].image_id
    var imgEl = document.createElement('img')

    if (!imgId) {
        imgEl.src = 'assets/images/no-image-avalible.jpg';
    } else {
        imgEl.src = 'https://www.artic.edu/iiif/2/' + imgId + '/full/843,/0/default.jpg'
    }
    artEl.innerHTML = "";
    artEl.appendChild(imgEl)
    
};

function next () {
    if (imgIndex < 11) {
        imgIndex++
        imgHandler()
        appendTitle()

        console.log(imgIndex)

    }
};
function prev () {
    if (imgIndex > 0) {
        imgIndex--
        imgHandler()
        appendTitle()

        console.log(imgIndex)

    }
};

if (page == 'index.html') {
    colorDiv.addEventListener('click', btnHandler);

} else {
    fetch(chicagoArtApi)
    .then (response => response.json())
    .then(({ data }) => {
        artDataArray = data;
        appendTitle()
        imgHandler()
        console.log(data)
        console.log(data[0].image_id)
    });

    homeBtn.addEventListener('click', returnHome);
    nextBtn.addEventListener('click', next)
    prevBtn.addEventListener('click', prev)
};

function backgroundChange(color) {
   document.body.style.background = color;
};