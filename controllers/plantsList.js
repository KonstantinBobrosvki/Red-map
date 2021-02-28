const { Client } = require('pg');
const fs = require('fs');

function CreatePlantsList(request, response) {

    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect()

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/plantsListHeadTags.hbs');

    client.query('SELECT * FROM plants', (err, res) => {
        if (err) throw err;
        
        response.render("plantsList",
            {
                types: res.rows,
                pageHeadTags: head
            });
        client.end();
    });


}

module.exports = {
    CreatePlantsList
}