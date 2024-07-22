require("dotenv").config(); 
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const foodsCtrl = require("./controllers/foods");

//DATABASE
require('./config/database');
const Food = require('./models/Food');
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//ROUTES
app.get('/', foodsCtrl.home);
app.get('/foods/new', foodsCtrl.newFood);
app.get('/foods/:foodId', foodsCtrl.findFood);
app.post('/foods', foodsCtrl.readyFood);
app.get('/foods', foodsCtrl.Foodidx);
app.delete('/foods/:foodId', foodsCtrl.FoodDelete);
app.get('/foods/:foodId/edit', foodsCtrl.FoodEdit);
app.put('/foods/:foodId', foodsCtrl.FoodUpdate);
app.get('/foods', foodsCtrl.index);


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });