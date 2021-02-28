const { Client } = require('pg');
const fs = require('fs');

function CreatePlantPage(request, response) {

    const id = request.params["id"];

   

    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    

    client.connect();

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/plantPageHeadTags.hbs');

    client.query("SELECT *,* FROM plants LEFT JOIN plants_info ON plants.id = plants_info.id WHERE plants.id = $1", [id]).then((result) => {
        if (result.rows == 0) {
            response.status(404).send();
            client.end();
            return;
        }
        else {
            result.rows[0].URL= result.rows[0].URL.replace(".html#map", ".jpg");
            response.render("plantPage",
                {
                    plant: result.rows[0],
                    pageHeadTags: head
                });
            client.end();
        }
    });

 

}



module.exports = {
    CreatePlantPage
}