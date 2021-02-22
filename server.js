const express = require('express');
const hbs = require("hbs");
const plantsList = require(__dirname + '/controllers/plantsList.js');
const index = require(__dirname + '/controllers/index.js');
const APIRouter = require(__dirname + '/API/APIRouter.js');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", __dirname+"/views");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("contact", function (s1,s2) {
    return s1.concat(s2);
});
hbs.registerHelper("replace", function (source,old,newstr) {
    return source.replace(old, newstr);
});


try {

    app.use("/api", APIRouter.APIRouter);

    app.get("/", function (req, res) {
        index.CreateIndex(req, res)
    });

    app.get("/plants", function (req, res) {
        plantsList.CreatePlantsList(req, res)
    });


  
    
} catch (e) {
    console.log(e);
    
}



app.listen(port);

