const { Client } = require('pg');
const fs = require('fs');

 function CreateIndex(request, response) {

    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

     client.connect();

     var head = fs.readFileSync('./views/partials/SpecifyHeadTags/indexHeadTags.hbs');

     client.query('SELECT * FROM plants', (err, res) => {
        if (err) throw err;
         response.render("index",
             {
                 types: res.rows,
                 pageHeadTags:head
             });
        client.end();
    });

   
}

module.exports = {
    CreateIndex
}