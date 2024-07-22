const express = require("express");
const app = express();
const Food = require('../models/Food');

const index = async (req, res) => {
  const foundFoods = await Food.find();
  res.render('foods/index.ejs', { foods: foundFoods });
};

const home = app.get("/", (req, res, next) => {
  res.render('index.ejs');
});

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


module.exports = {
  home,
  newFood,
  findFood,
  readyFood,
  Foodidx,
  FoodDelete,
  FoodEdit,
  FoodUpdate,
  index
}