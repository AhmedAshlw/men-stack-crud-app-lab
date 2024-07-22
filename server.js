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
    const food = await Food.findById(req.params.foodId);
    res.render('foods/show.ejs', {food});
})

const readyFood = app.post("/foods",  async (req, res, next) => {
  await Food.create(req.body);
  res.redirect("/foods"); 
});

const Foodidx = app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", { foods: allFoods });
});

const FoodDelete = app.delete("/foods/:foodId", async (req, res) => {
  await Food.findByIdAndDelete(req.params.foodId);
  res.redirect("/foods");
});

const FoodEdit = app.get("/foods/:foodId/edit", async (req, res) => {
  const food = await Food.findById(req.params.foodId);
  res.render("foods/edit.ejs", {food});
});

const FoodUpdate =  app.put("/foods/:foodId", async (req, res) => {
  await Food.findByIdAndUpdate(req.params.foodId, req.body);
  res.redirect(`/foods/${req.params.foodId}`);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });