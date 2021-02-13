const express = require('express');
const hbs = require("hbs");
var tools = require(__dirname +'/controllers/index.js');

const app = express();
const port = process.env.PORT || 3030;

console.log(process.env.DATABASE_URL);


app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", __dirname+"/views");
hbs.registerPartials(__dirname + "/views/partials");

try {
    app.get("/", function (req, res) {

        tools.CreateIndex(req, res)
    });
  
    
} catch (e) {
    console.log(e);
    // [Error: Uh oh!]
}

//function (request, response) {   
    
   // response.render("index.hbs");
//});


app.listen(port);

