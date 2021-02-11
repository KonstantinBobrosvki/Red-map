var http = require('http');
const express = require('express');
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3030;


app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", __dirname+"/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/", function (request, response) {   
    
    response.render("index.hbs");
});


app.listen(port);

