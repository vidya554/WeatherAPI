const express = require("express");
const router = express.Router();

// const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const Weather = require("../models/Weather");
const { deleteOne } = require("../models/Weather");

router.get("/", async (req, res) => {
  const fetch = require("node-fetch");

  let url = "";

  let settings = { method: "Get" };

  var cityJson = require("../cityList.json");

  const appId = "fff7d8db92ccdce30140e15823d5f9e2";

  let url1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  let url2 = "&lon=";
  let url3 = "&appid=";

  for (let i = 0; i < cityJson.length; i++) {
    url =
      url1 +
      cityJson[i].coord.lat +
      url2 +
      cityJson[i].coord.lon +
      url3 +
      appId;
    console.log("Loaded data for: ", cityJson[i].name);

    const get_data = async (url) => {
      try {
        //fetching weather data from API
        const response = await fetch(url, settings);
        const json = await response.json();
        json.city = cityJson[i].name;
        json.country = cityJson[i].country;
        json.city_code = cityJson[i].city_id;

        //Delete Existing record
        const deletedpost = await Weather.deleteOne({city:  cityJson[i].name})

        //Adding a record
        const data = new Weather(json);
        const savedPost = await data.save();
      } catch (error) {
        console.log(error);
      }
    };
    get_data(url);
  }
  res.json({ message: "Success" });
  res.status(200);
});
module.exports = router;
