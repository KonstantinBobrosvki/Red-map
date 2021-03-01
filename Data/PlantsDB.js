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

function GetPlants(callback) {

    const client = CreateClient();

    client.connect();

    client.query('SELECT * FROM plants', (err, res) => {
        if (err) {
            console.log(err);
            client.end();
            return callback(null);
        } 
        else {
            client.end();
            return callback(res.rows);
        }
       
    });

}

function GetPlant(id,callback) {

    const client = CreateClient();

    client.connect();

    client.query('SELECT * FROM plants WHERE plants.id = $1', [id], (err, res) => {
        if (err) {
            console.log(err);
            client.end();
            return callback(null);
        }
        else {
            
            client.end();
            return callback(res.rows[0]);
        }
        
    });

}

function GetPlantInfo(id, callback) {

    const client = CreateClient();

    client.connect();

    client.query('SELECT *,* FROM plants LEFT JOIN plants_info ON plants.id = plants_info.id WHERE plants.id = $1', [id], (err, res) => {
        if (err) {
            console.log(err);
            client.end();
            return callback(null);
        }
        else {
            client.end();
            return callback(res.rows[0]);
        }
        
    });

}

module.exports = {
    GetPlants,
    GetPlant,
    GetPlantInfo
}