var maxid = 0;
const loadCardsMax = 12;
var loading = false;

$(document).ready(function () {
    for (var i = 0; i < loadCardsMax; i++) {
        var info = LoadNewPlant(maxid, CreateAndAddCard);
     
        maxid = maxid + 1;
    }
    
});

$(window).scroll(function () {

    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
        if (!loading) {
            loading = true;
            console.log("loading");
            if (maxid <= 807) {

                $.LoadingOverlay("show");
                setTimeout(function () {
                    loading = false;
                    $.LoadingOverlay("hide");
                }, 1500);

            }
            for (var i = 0; i < loadCardsMax; i++) {

                if (maxid <= 807) {
                    var info = LoadNewPlant(maxid, CreateAndAddCard);
                    maxid = maxid + 1;
                }


            }
        }
    }

});





function LoadNewPlant(id, callback) {
    $.ajax({
        url: "/api/getPlantInfobyID?id=" + id,
        contentType: "application/json",
        dataType: 'json',
        success: function (respone) {
            var result = respone[0];
           
            return callback(result);
           

        },
        error: function () {
            alert("Извенете в момента не можем да ви дадем информация за това растение");
        }
    });
}

function CreateAndAddCard(info) {

    info = NormalizeAPIData(info);
    var template ="".concat('<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3">',
                      '<div class="card" >',
                            '<img class="card-img-top img-thumbnail" src="/img/',info.URL.replace(".html#map",".jpg") ,'" alt="Card image cap" >',
                                '<div class="card-body">',
                                    '<h5 class="card-title">', info.LatinName ,'</h5>',
                                    '<p class="card-text"> ', info.morphology ,'</p>',
                                    '<a href="#" class="btn btn-primary">Go somewhere</a>',
                                '</div>',
                      '</div >',
        '</div >');
    
    $("#allCards").append(template);
    return template;
}

function NormalizeAPIData(obj) {

    if (obj.morphology[0] == " " || obj.morphology[0] == ".") {
        obj.morphology = obj.morphology.substring(1);
       
    }
    if (obj.morphology.length > 400) {
        obj.morphology= obj.morphology.substring(0, 397).concat(" ... ");
    }
    return obj;
}
