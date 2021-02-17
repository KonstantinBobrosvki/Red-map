const express = require('express');
const hbs = require("hbs");
const index = require(__dirname + '/controllers/index.js');
const APIRouter = require(__dirname + '/API/APIRouter.js');

const app = express();
const port = process.env.PORT || 3030;

console.log(process.env.DATABASE_URL);


app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", __dirname+"/views");
hbs.registerPartials(__dirname + "/views/partials");

try {

    app.use("/api", APIRouter.APIRouter);

    app.get("/", function (req, res) {
        index.CreateIndex(req, res)
    });


  
    
} catch (e) {
    console.log(e);
    
}



app.listen(port);

