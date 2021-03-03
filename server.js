const express = require('express');
const hbs = require("hbs");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");


const plantsList = require(__dirname + '/controllers/plantsList.js');
const index = require(__dirname + '/controllers/index.js');
const plantPage = require(__dirname + '/controllers/plantPage.js');
const guestbook = require(__dirname + '/controllers/guestbook.js');
const thanks = require(__dirname + '/controllers/thanks.js');
const APIRouter = require(__dirname + '/API/APIRouter.js');

const app = express();
const port = process.env.PORT || 3030;
var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.set("view engine", "hbs");

app.set("views", __dirname+"/views/");
hbs.registerPartials(__dirname + "/views/partials/");

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))

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

    app.get("/plant/:id", function (req, res) {
        plantPage.CreatePlantPage(req, res)
    });

    app.get("/guestbook", function (req, res) {
        guestbook.CreateGuestBook(req, res);
    });
    app.post("/guestbook", jsonParser, function (req, res) {
        guestbook.AddLetter(req, res);
    });

    app.get("/thanks", function (req, res) {
        thanks.CreateThanks(req, res);
    });
  
    
} catch (e) {
    console.log(e);
    
}



app.listen(port);

