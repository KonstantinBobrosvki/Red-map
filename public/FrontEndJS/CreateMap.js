var map = L.map("map").setView([42.6237, 25.3961], 13);
var fd;
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia29rb2RxbmtvdiIsImEiOiJja2tvZTB0ZGUybDBwMnZxdGJoN3ZremlrIn0.uwZ7_9LoBPCmeakn1JxkSA'
}).addTo(map);


jQuery.get(window.location.hostname+'/public/BGR.geo.json', function (data) {
    fd = data;
    var a = $.parseJSON(data);
    document.body.innerText = data;
    L.geoJSON(a).addTo(map);
});



