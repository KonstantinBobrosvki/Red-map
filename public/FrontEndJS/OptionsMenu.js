var markersDictionary = new Object();

function ToogleSearchBar() {

    document.getElementById("select-bar").classList.toggle("show");
    var bar = document.getElementById("sidebar-toogle-button");   
    bar.classList.toggle("active");
    if (bar.innerHTML === "Отвори търсене на видове") {
        bar.innerHTML = "Затвори търсене на видове";
    } else {
        bar.innerHTML = "Отвори търсене на видове";
    }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("Search-bar");
    filter = input.value.toUpperCase();
    div = document.getElementById("select-bar");
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
} 

function plantOptionClick(sender) {
    sender.classList.toggle("bg-success");
    if (sender.classList.contains("bg-success")) {
        addPlantsToMap(sender);
    }
    else {
        removePlantsFromMap(sender)
    }
}

function addPlantsToMap(sender) {
    const id = sender.getAttribute("plant_id");
    const url = sender.getAttribute("plant_url");

    const img_path = "./img/" + url.replace(".html#map", ".jpg");
    const option_select = $(sender);

    markersDictionary[id] = new Array();
    $.ajax({
        url: "/api/getCordinatesbyID?id=" + id,
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            const cordinates = unionClosePoints( result,30);         
            cordinates.forEach(cordinate => {
                var greenIcon = L.icon({
                    iconUrl: img_path,


                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                var marker = L.marker([cordinate.latitude, cordinate.longitude], { icon: greenIcon });
                markersDictionary[id].push(marker);
                marker.addTo(map);//.bindPopup("<b> " + option_select.text() + " </b> <br> Тук съм.", { autoClose: false }).openPopup();
            });
        },
        error: function () {
            alert("Извенете в момента не можем да ви дадем информация за това растение");
        }
    })
}

function unionClosePoints(cordinates,kilometres) {
    var cordinatesCopy = [...cordinates];
    var result = new Array();
   
    for (var i = 0; i < cordinatesCopy.length; i++) {
        var min_dist = 1000;
        var closestPoint;
        var p = cordinatesCopy[i];
        for (var j = i+1; j < cordinatesCopy.length; j++) {
           
            var q = cordinatesCopy[j];
            var distantse = calcCrow(p, q);
            if (distantse < min_dist) {
                closestPoint = q;
                min_dist = distantse;
            }
        }
        if (min_dist < kilometres) {
            if (!result.includes(closestPoint)) {
                result.push(closestPoint);
            }
        }
        else {
            if (!result.includes(p)) {
                result.push(p);
            }
        }
    }
    return result;
}

//retuns kilometres
function calcCrow(p1,p2) {

    var lat1 = p1.latitude;
    var lon1 = p1.longitude;
    var lat2 = p2.latitude;
    var lon2 = p2.longitude;

    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

function removePlantsFromMap(sender) {
    const id = sender.getAttribute("plant_id");
    var markers = markersDictionary[id]
    for (i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
}



