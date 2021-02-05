let plants;

jQuery.get('/plants.json', function (data) {
    let jsonObject = data;
    plants = data;
    var sel = document.getElementById('select-bar');
    for (var i = 0; i < jsonObject.length; i++) {
        var itemName = jsonObject[i].BulgarinaName;
        var itemID = jsonObject[i].ID;

        // create new option element
        var opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild(document.createTextNode(itemName));

        // set value property of opt
        opt.value = itemID;

        
        opt.classList.add("select-bar-option");

        // add opt to end of select box (sel)
        sel.appendChild(opt); 
    }
       

     
});



function Select_bar_change(){

    
    $.each($("#select-bar option:selected"), function () {

        var img_path = "http://e-ecodb.bas.bg/rdb/drawings/vol1/" + plants[$(this).val()].Link.replace(".html#map",".jpg");

        console.log(img_path);
       
        var greenIcon = L.icon({
            iconUrl: img_path,
            

            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
           
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
      

        L.marker([42.6237 + Math.random(), 25.3961 + Math.random()], { icon: greenIcon }).addTo(map).bindPopup("<b> " + $(this).text() + " </b> <br> " + $("#sone").text() + " .").openPopup();
    });

}