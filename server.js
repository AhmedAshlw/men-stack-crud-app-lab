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

const home = app.get("/", (req, res, next) => {
    res.render('index.ejs');
  });

 //FOOD
 app.get('/foods', foodsCtrl.index);

 const newFood = app.get("/foods/new", (req, res) => {
    res.render("foods/new.ejs");
  });

const findFood = app.get("/foods/:foodId", async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId);
    res.render('foods/index.ejs', {food: foundFood});
})

const readyFood = app.post("/foods",  async (req, res, next) => {
  await Food.create(req.body);
  res.redirect("/foods"); 
});

const Foodidx = app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", { foods: allFoods });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });