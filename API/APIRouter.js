const express = require("express");
const getCordinatesbyID = require(__dirname + '/getCordinatesbyID.js');
const PlantAPIs = require(__dirname + '/PlantAPIs.js');

const APIRouter = express.Router();

APIRouter.use("/getCordinatesbyID", function (request, response) {
    getCordinatesbyID.getCordinatesbyID(request, response);
});
APIRouter.use("/getPlantbyID", function (request, response) {
    PlantAPIs.GetPlantbyID(request, response);
});
APIRouter.use("/getPlantInfobyID", function (request, response) {
    PlantAPIs.GetPlantInfobyID(request, response);
});
APIRouter.use("/getAllPlants", function (request, response) {
    PlantAPIs.GetAllPlants(request, response);
});



module.exports = { APIRouter }