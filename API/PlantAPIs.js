const express = require("express");
const PlantsDB = require('../Data/PlantsDB.js');
const fs = require('fs');

function GetPlantbyID(request, response) {

    const id = request.query.id;

    PlantsDB.GetPlant(id, (result) => {
        if (result==null) {
            response.status(404).send();
            return;
        }
        else {
            response.send(result);       
        }
    });
   
}

function GetPlantInfobyID(request, response) {

    const id = request.query.id;

    PlantsDB.GetPlantInfo(id, (result) => {
        if (result == null) {
            response.status(404).send();
            return;
        }
        else {
            response.send(result);
        }
    });

}

function GetAllPlants(request, response) {
    PlantsDB.GetPlants((result) => {
        if (result == null) {
            response.status(404).send();
            return;
        }
        else {
            response.send(result);
        }
    });
}

module.exports = {
    GetPlantbyID,
    GetPlantInfobyID,
    GetAllPlants
} 