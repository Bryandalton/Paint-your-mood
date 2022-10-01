var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";
var harvardArtApi = 'https://api.harvardartmuseums.org/image?sort=random&apikey=1421f73f-acb6-4564-a869-c9f72b2ad32c'
var infoAside = document.querySelector(".info");
var homeBtn = document.querySelector("#home");
var colorBtns = document.querySelectorAll(".color-btn");
var colorDiv = document.querySelector("#color-div");
var pathName = window.location.pathname;
var pageArray = pathName.split("/");
var page = pageArray[pageArray.length - 1];
var artEl = document.querySelector(".art");
var nextBtn = document.querySelector("#next");
var prevBtn = document.querySelector("#prev");
var artTypeEL = document.querySelector("#type");
var artistEL = document.querySelector("#artist");
var titleEL = document.querySelector("#title");
var artDataArray =[];
var records = [];
var imgIndex = 0;

function appendTitle() {
  titleEL.innerText = artDataArray[imgIndex].title;
  artistEL.innerText = artDataArray[imgIndex].artist_title;
  artTypeEL.innerText = artDataArray[imgIndex].artwork_type_title;
}

function returnHome() {
  document.location.href = document.location.href.replace(
    "display.html",
    "index.html"
  );
}

function btnHandler() {
  document.location.href = document.location.href.replace(
    "index.html",
    "display.html"
  );
}

function imgHandler() {
  var imgId = artDataArray[imgIndex].image_id;
  var harvardImgUrl = records[imgIndex].baseimageurl
  var imgEl = document.createElement("img");

  if (!imgId || !harvardImgUrl) {
    imgEl.src = "assets/images/no-image-avalible.jpg";
  } else if (imgId) {
    imgEl.src =
      "https://www.artic.edu/iiif/2/" + imgId + "/full/843,/0/default.jpg";
  } else {imgEl.src = harvardImgUrl}
  artEl.innerHTML = "";
  artEl.appendChild(imgEl);
}

function next() {
  if (imgIndex < artDataArray.length) {
    imgIndex++;
    imgHandler();
    appendTitle();
    console.log(imgIndex);
  } else if (imgIndex == artDataArray.length) {
    imgIndex = 0;
    
  }
}
function prev() {
  if (imgIndex > 0) {
    imgIndex--;
    imgHandler();
    appendTitle();

    console.log(imgIndex);
  }
}

if (page == "index.html") {
  colorDiv.addEventListener("click", btnHandler);
} else {
  fetch(chicagoArtApi)
    .then((response) => response.json())
    .then(({ data }) => {
      artDataArray = data;
      appendTitle();
      imgHandler();
      console.log(data);
    });

    fetch(harvardArtApi)
    .then(response => response.json())
    .then(data => {console.log(data);
    records = data.records;
    imgHandler()
    })

  homeBtn.addEventListener("click", returnHome);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
}

function backgroundChange(color) {
  document.body.style.background = color;
}
