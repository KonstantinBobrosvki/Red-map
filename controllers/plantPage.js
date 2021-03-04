
const fs = require('fs');
const PlantsDB = require('../Data/PlantsDB.js');

function CreatePlantPage(request, response) {

    const id = request.params["id"];


    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/plantPageHeadTags.hbs');
   
    
    PlantsDB.GetPlantInfo(id, (result) => {
        if (result==null) {
            response.status(404).send();
            
            return;
        }
        else {
            if (result.BulgarianName == null) {
                result.BulgarianName = "";
            }
            result.URL = result.URL.replace(".html#map", ".jpg");
            head = head + '<meta name="description" content="' + result.LatinName + " е " + result.morphology.substring(0,120) +'">';
            head = head + '<meta name = "keywords" content = "' + result.LatinName + ',' + result.BulgarianName + ',' + result.bg_spread.split(' ', 7).join(", ") + '">';
            head = head + '<title>' + result.LatinName +'</title>';
            response.render("plantPage",
                {
                    plant: result,
                    pageHeadTags: head
                });
            
        }
    })
}



module.exports = {
    CreatePlantPage
}