var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";
var harvardArtApi =
  "https://api.harvardartmuseums.org/image?sort=random&apikey=1421f73f-acb6-4564-a869-c9f72b2ad32c";
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
var artDataArray = [];
var harvardApiRecords = [];
var chicagoImgIndex = 0;
var harvardImgIndex = 0;
var lastPick = document.querySelector("#lastPick");
console.log(lastPick);

function backgroundChange(color) {
  document.body.style.background = color;
}
function chicagoArtInfo() {
  titleEL.innerText = artDataArray[chicagoImgIndex].title;
  artistEL.innerText = artDataArray[chicagoImgIndex].artist_title;
  artTypeEL.innerText = artDataArray[chicagoImgIndex].artwork_type_title;
}

function harvardArtInfo() {
  titleEL.innerText = harvardApiRecords[harvardImgIndex].caption;
  artistEL.innerText = harvardApiRecords[harvardImgIndex].copyright;
  artTypeEL.innerText = harvardApiRecords[harvardImgIndex].format;
}

function btnHandler(event) {
  localStorage.setItem("lastPick", event.target.innerText);
  console.log(localStorage.getItem("lastPick"));
}

function imgHandler() {
  var imgId = artDataArray[chicagoImgIndex]?.image_id;
  var harvardImgUrl = harvardApiRecords[harvardImgIndex]?.baseimageurl;
  var imgEl = document.createElement("img");
  if (!imgId && !harvardImgUrl) {
    imgEl.src = "assets/images/no-image-avalible.jpg";
  } else if (imgId) {
    imgEl.src =
      "https://www.artic.edu/iiif/2/" + imgId + "/full/843,/0/default.jpg";
  } else {
    imgEl.src = harvardImgUrl;
  }
  artEl.innerHTML = "";
  artEl.appendChild(imgEl);
}

function next() {
  if (chicagoImgIndex < artDataArray.length) {
    chicagoImgIndex++;
    imgHandler();
    chicagoArtInfo();
    console.log(chicagoImgIndex);
  } else if (
    chicagoImgIndex == artDataArray.length &&
    harvardImgIndex < harvardApiRecords.length
  ) {
    harvardImgIndex++;
    imgHandler();
    harvardArtInfo();
  }
}
function prev() {
  if (harvardImgIndex > 0) {
    harvardImgIndex--;
    imgHandler();
    harvardArtInfo();
    console.log(harvardImgIndex);
  } else if (chicagoImgIndex > 0) {
    chicagoImgIndex--;
    imgHandler();
    chicagoArtInfo();
    console.log(chicagoImgIndex);
  }
}

if (page == "index.html") {
  for (let i = 0; i < colorBtns.length; i++)
    colorBtns[i].addEventListener("click", btnHandler);
  lastPick.innerText = localStorage.getItem("lastPick");
} else {
  fetch(chicagoArtApi)
    .then((response) => response.json())
    .then(({ data }) => {
      artDataArray = data;
      chicagoArtInfo();
      imgHandler();
      console.log(artDataArray);
    });

  fetch(harvardArtApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      harvardApiRecords = data.records;
    });
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
}
