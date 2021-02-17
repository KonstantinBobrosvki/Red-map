
function Select_bar_change() {
    $.each($("#select-bar option:selected"), function () {

       // "A:\C# projects\Red-map\public\img\Agabohus.jpg"+
        const id = $(this).val();
        
        const response = fetch("./api/imageURLbyid:" + id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
      
        var sel = $(this);

        $.ajax({
            url: "./api/imageURLbyid:" + id,
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {
                const url = result.URL;
                
                const img_path = "./img/" + url.replace(".html#map", ".jpg");
              

                var greenIcon = L.icon({
                    iconUrl: img_path,


                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });


                L.marker([42.6237 + Math.random(), 25.3961 + Math.random()], { icon: greenIcon }).addTo(map).bindPopup("<b> " + sel.text() + " </b> <br> " + $("#sone").text() + " .").openPopup();
            }
        })

            

        
        
    });
}
 


