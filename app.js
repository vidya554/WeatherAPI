const bodyParser = require("body-parser");
const express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const schedule = require("node-schedule");
const request = require("request");

//Middleware
app.use(bodyParser.json());
app.use(cors()); //cross origin

//Import Routes
const postRoute = require("./routes/posts");
const cityRoute = require("./routes/cities");
const weatherRoute = require("./routes/weather");
const addData = require("./routes/addData");
const { response } = require("express");
app.use("/posts", postRoute);
app.use("/cities", cityRoute);
app.use("/weather", weatherRoute);
app.use("/addData", addData);

//Routes
app.get("/", (req, res) => {
  res.send("App is running");
});

//Connect to DB
Mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("App is running")
);

//Schedule periodic data pulls from Openweather
const url = "http://localhost:3000/addData";
let settings = { method: "Get" };
const get_data = async (url) => {
  try {
    console.log("GetData URL")
    const response = await fetch(url, settings);
    console.log(response);
  } catch(err) {}
};
// var j = schedule.scheduleJob("30 * * * * *", function () {
//   // Make a call to /addData
  
  
//    request.get({ url: "http://localhost:3000/addData" },      function(error, res, body) {
//            if (!error && res.statusCode == 200) {
//                console.log("Updated weather data");
//               }
//   });
// });

//Start Listening
app.listen(3000);
