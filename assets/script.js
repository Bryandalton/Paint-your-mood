//to be added
var chicagoArtApi = "https://api.artic.edu/api/v1/artworks";


fetch(chicagoArtApi)
.then (response => response.json())
.then(data => console.log(data));
