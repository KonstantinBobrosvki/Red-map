
const fs = require('fs');
const PlantsDB = require('../Data/PlantsDB.js');

function CreatePlantsList(request, response) {

    

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/plantsListHeadTags.hbs');

    PlantsDB.GetPlants((result) => {
        if (result == null) {
            response.status(404).send();
            return;
        }

        head = head + '<meta name="description" content="Списък растения и гъби, които са застрашени от изчезване">'
        head = head + '<meta name = "keywords" content = "Видове, застрашени, списък, биология, растения, гъби" >'
        head = head + '<title>Списък видове</title>'
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