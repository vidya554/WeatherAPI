const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

const Weather = require("../models/Weather");


//for current weather info
router.get("/current/:city/:country", async (req, res) => {
  try {
    const currentWeather = await Weather.findOne({city:  { $regex : new RegExp(req.params.city, "i") }, country: { $regex : new RegExp(req.params.country, "i") }},{city:1, current:1, daily:{ $slice: 1 }, timezone:1});
    console.log("Trying find in weather data",req.params.city,' , ',req.params.country);
    // console.log(currentWeather);
    res.json(currentWeather);
  } catch (err) {
    res.json({ message: err });
  }
});

//for weekly forecast
router.get("/current/forecast/:city/:country", async (req, res) => {
  try {
    const currentWeather = await Weather.findOne({city:  { $regex : new RegExp(req.params.city, "i") }, country: { $regex : new RegExp(req.params.country, "i") }},{city:1, current:1, daily:1, timezone:1});
    console.log("Trying find in weather data",req.params.city,' , ',req.params.country);
    // console.log(currentWeather);
    res.json(currentWeather);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
