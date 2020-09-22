const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
// const axios = require("axios");

const City = require("../models/City");

router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
    // populate();
  } catch (err) {
    res.json({ message: err });
  }
});


//Returns list of cities when search string is provided
router.get("/:cityString", async (req, res) => {
  try {
    console.log("Searching for: ", req.params.cityString);
    const cities = await City.find(
      { "city.name": new RegExp(req.params.cityString, "i") },
      " city.id city.name city.country"
    ).limit(20);
    console.log("Cities: ", cities);
    res.json(cities);
    console.log("We are in cities");
  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router;
