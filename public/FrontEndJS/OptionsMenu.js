
function Select_bar_change() {
    $.each($("#select-bar option:selected"), function () {
     
        const url = $(this).val();       
        const img_path = "./img/" + url.replace(".html#map", ".jpg");
        const id = $(this).attr("plant_id");
        const option_select = $(this);
        $.ajax({
            url: "/api/getCordinatesbyID?id=" + id,
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {
                const cordinates = result;

                cordinates.forEach(cordinate => {
                    var greenIcon = L.icon({
                        iconUrl: img_path,


                        iconSize: [38, 95], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });

                    
                    L.marker([cordinate.latitude, cordinate.longitude], { icon: greenIcon }).addTo(map).bindPopup("<b> " + option_select.text() + " </b> <br> " + $("#sone").text() + " .").openPopup();
                });
            }
        })

     
           
        


               
  
    });
}
 


