const express = require("express");
const { Client } = require('pg');
const fs = require('fs');

function imageURLbyid(request, response) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || JSON.parse(fs.readFileSync("./LocalSecretConfigs/DBConfings.json")).connection_string,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect()

    const id = request.params.id;

    client.query('SELECT "URL" FROM plants WHERE id = $1', [id]).then( (result) => {
        if (result.rows == 0) {
            response.status(404).send();
        }
        else {
            response.send(result.rows[0] );
        }
        client.end();
    });
}

module.exports = {
    imageURLbyid
}