const fs = require('fs');
const PlantsDB = require('../Data/PlantsDB.js');

 function CreateIndex(request, response) {

     var head = fs.readFileSync('./views/partials/SpecifyHeadTags/indexHeadTags.hbs');

     PlantsDB.GetPlants((result) => {

         if (result == null) {
             response.status(404).send();
             return;
         }
         head = head + '<meta name="description" content="Red-map е визуализирана версия на червената книга на република България.Тук може да намерите изчезващи видове">'
         head = head + '<meta name = "keywords" content = "Red map, застрашени, растения, червена книга, гъби, изчезване, карта, България" >'

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