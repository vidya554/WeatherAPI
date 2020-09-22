const mongoose = require("mongoose");

const WeatherSchema = mongoose.Schema({
  city_code: {
    type: Number,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  country: {
    type: String,
    require: true
  },
  lat: {
    type: Number,
    require: true
  },
  lon: {
    type: Number,
    require: true
  },
  timezone: {
    type: String,
    require: true
  },
  current: Object,
  minutely: Object,
  hourly: Object,
  daily: Object,
});

module.exports = mongoose.model("weatherData", WeatherSchema);

