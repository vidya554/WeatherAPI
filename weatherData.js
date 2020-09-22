const express = require("express");
// const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

// require("dotenv/config");
const app = express();

//Middleware
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
  res.send("App is running");
});

const fetch = require("node-fetch");
let dburl =
  "mongodb+srv://vidya:Vidya@554@mycluster1.e5oce.mongodb.net/weatherApp?retryWrites=true&w=majority";
let url = "";

let settings = { method: "Get" };

var cityJson = require("./cityList.json");
// const { Mongoose } = require("mongoose");
const appId = "fff7d8db92ccdce30140e15823d5f9e2";

let url1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
let url2 = "&lon=";
let url3 = "&appid=";

for (let i = 0; i < cityJson.length; i++) {
  url =
    url1 + cityJson[i].coord.lat + url2 + cityJson[i].coord.lon + url3 + appId;
    console.log(cityJson[i].name)

  const get_data = async (url) => {
    try {
      const response = await fetch(url, settings);
      const json = await response.json();
      json.city = cityJson[i].name;
      console.log("Received Data");

      MongoClient.connect(dburl, { useUnifiedTopology: true }, function (
        err,
        db
      ) {
        if (err) throw err;
        var dbo = db.db("weatherApp");
        // dbo.createCollection("customers", function (err, res) {
        //       //   if (err) throw err;
        //       console.log("Collection created!");
        //       db.close();
        
        dbo.collection("weatherData").insertOne(json, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  get_data(url);
}
//Start Listening
app.listen(5000);
