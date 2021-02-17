const express = require("express");
const imageURLbyid = require(__dirname + '/imageURLById.js');

const APIRouter = express.Router();

APIRouter.use("/imageURLbyid::id", function (request, response) {
    imageURLbyid.imageURLbyid(request, response);
});



module.exports = { APIRouter }