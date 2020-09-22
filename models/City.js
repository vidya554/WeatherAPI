const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
  city: {
      id: {
          type: Number,
          require: true
      },
      name: {
          type: String,
          require: true
      },
      findname: {
          type: String,
          require: true
      },
      country: {
          type: String,
          require: true
      },
      coord: {
          lon: {
              type: Number,
              require: true
          },
          lat: {
              type: Number,
              require: true
          }
      }

  }
});

module.exports = mongoose.model("cities", CitySchema);
