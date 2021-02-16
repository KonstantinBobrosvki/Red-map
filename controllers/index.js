const { Client } = require('pg');
const fs = require('fs');
 function CreateIndex(request, response) {

    console.log("HERE");

    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect()

     client.query('SELECT * FROM plants Where "BulgarianName" IS NOT NULL', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
         }
         response.render("index.hbs",
             {
                 types: res.rows
             });
        client.end();
    });

   
}

module.exports = {
    CreateIndex
}