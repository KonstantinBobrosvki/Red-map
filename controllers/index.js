const fs = require('fs');
const PlantsDB = require('../Data/PlantsDB.js');

 function CreateIndex(request, response) {

     var head = fs.readFileSync('./views/partials/SpecifyHeadTags/indexHeadTags.hbs');

     PlantsDB.GetPlants((result) => {

         if (result == null) {
             response.status(404).send();
             return;
         }

         response.render("index",
             {
                 types: result,
                 pageHeadTags: head
             });
     });

}

module.exports = {
    CreateIndex
}