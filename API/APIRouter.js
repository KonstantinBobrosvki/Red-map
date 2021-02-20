const express = require("express");
const getCordinatesbyID = require(__dirname + '/getCordinatesbyID.js');

const APIRouter = express.Router();

APIRouter.use("/getCordinatesbyID", function (request, response) {
    getCordinatesbyID.getCordinatesbyID(request, response);
});



module.exports = { APIRouter }