const express = require("express");
const PlacesDB = require('../Data/PlacesDB.js');
const fs = require('fs');

function getCordinatesbyID(request, response) {
    

    const id = request.query.id;

    PlacesDB.getPlantCordinatesbyID(id, (result) => {
        if (result == null)
            response.status(404).send();
        else
            response.send(result)
    });

   
    
}

module.exports = {
    getCordinatesbyID
} 