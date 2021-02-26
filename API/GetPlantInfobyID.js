const express = require("express");
const { Client } = require('pg');
const fs = require('fs');

function GetPlantInfobyID(request, response) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect()

    const id = request.query.id;

    var url = "";

    
    client.query("SELECT *,* FROM plants LEFT JOIN plants_info ON plants.id = plants_info.id WHERE plants.id = $1", [id]).then((result) => {
        if (result.rows == 0) {
            response.status(404).send();
            client.end();
            return;
        }
        else {          
            response.send(result.rows);
            client.end();           
        }
    });
}

module.exports = {
    GetPlantInfobyID
} 