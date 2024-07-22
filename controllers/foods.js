const express = require("express");
const app = express();
const Food = require('../models/Food');

const index = async (req, res) => {
  const foundFoods = await Food.find();
  res.render('foods/index.ejs', { foods: foundFoods });
};

module.exports = {
    index
}