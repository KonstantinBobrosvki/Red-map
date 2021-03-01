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

function getLetters(callback) {

    const client = CreateClient();


    client.connect()
    

    client.query('SELECT * FROM letters').then((result) => {
       
        if (result.rows == 0) {
            client.end();
            return callback(null)
        }
        else {
            client.end();
            return callback(result.rows);
        }
              
       
    });
}

function insertLetter(username,letter, callback) {
    const client = CreateClient();

    client.connect();

    client.query('insert into letters (userName,letter) Values($1,$2) RETURNING *;', [username, letter], (err, result) => {
        if (err) {
            console.log(err);
            client.end();

            return callback(null);
        }

        client.end();
        return callback(result.rows[0]);
       
    });

}

module.exports = {
    getLetters,
    insertLetter
}