require("dotenv").config(); 
const express = require("express");
const morgan = require("morgan");
const foodsCtrl = require("./controllers/foods");

//DATABASE
require('./config/database');
const Food = require('./models/Food');
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));

const home = app.get("/", (req, res, next) => {
    res.render('index.ejs');
  });

 //FOOD
 app.get('/foods', foodsCtrl.index);

 const newFood = app.get("/foods/new", (req, res) => {
    res.render("foods/new.ejs");
  });



app.listen(3000, () => {
    console.log("Listening on port 3000");
  });