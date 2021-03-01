const { Client } = require('pg');
const fs = require('fs');

function CreateClient() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    return client;
}

function getPlantCordinatesbyID(id, callback) {

    const client = CreateClient();
       

    client.connect()

  
   

    client.query('SELECT "URL" FROM plants WHERE id = $1', [id]).then((result) => {
        if (result.rows == 0) {
           
            return callback( null);
        }
        else {
            var url = result.rows[0].URL;
            const data = fs.readFileSync(__dirname+"/places/" + url.replace(".html#map", ".txt"), 'utf8');
            var places = data.split(' ');
            var uniqueplaces = places.filter(function (elem, pos) {
                client.end();
                return places.indexOf(elem) == pos;
            })

            var query = 'select "latitude","longitude" from places where place_name SIMILAR TO ';
            query = query + "'(";
            for (var i = 0; i < uniqueplaces.length - 1; i++) {
                var ite = uniqueplaces[i];
                query = query + "%" + ite + "%|";

            }
            query = query.slice(0, -1);
            query = query + ")'";



            client.query(query).then((cordinates) => {

                if (cordinates.rows == 0) {
                    client.end();
                    return callback(null)
                }
                else {
                    client.end();
                    return callback(cordinates.rows);
                }


                
            });
        }
    });
}

module.exports = {
    getPlantCordinatesbyID
}