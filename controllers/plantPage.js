
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
            result.URL = result.URL.replace(".html#map", ".jpg");
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