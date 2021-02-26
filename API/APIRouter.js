const express = require("express");
const getCordinatesbyID = require(__dirname + '/getCordinatesbyID.js');
const GetPlantInfobyID = require(__dirname + '/GetPlantInfobyID.js');

const APIRouter = express.Router();

APIRouter.use("/getCordinatesbyID", function (request, response) {
    getCordinatesbyID.getCordinatesbyID(request, response);
});
APIRouter.use("/getPlantInfobyID", function (request, response) {
    GetPlantInfobyID.GetPlantInfobyID(request, response);
});



module.exports = { APIRouter }