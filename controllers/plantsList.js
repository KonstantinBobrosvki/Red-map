
const fs = require('fs');
const PlantsDB = require('../Data/PlantsDB.js');

function CreatePlantsList(request, response) {

    

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/plantsListHeadTags.hbs');

    PlantsDB.GetPlants((result) => {
        if (result == null) {
            response.status(404).send();

            return;
        }
        response.render("plantsList",
            {
                types: result,
                pageHeadTags: head
            });
    })
}

module.exports = {
    CreatePlantsList
}