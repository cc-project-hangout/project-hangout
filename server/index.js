const express = require("express");
const path = require("path");
const app = express();
const { loadHotels } = require("./utils/Hotels/loadHotels")
// const {getEvents} = require('./utils/Events/getEvents');

// const morgan = require("morgan");
// app.use(morgan("dev"));

app.use("/api", express.json(), express.urlencoded({ extended: true }));
// app.use("/api", express.json(), express.urlencoded({ extended: true }), api);

app.use(express.static(path.join(__dirname, "../build/")));

app.post("/api/hotels", async (req, res) => {
  try {
    const cityInfo = req.body;
    const hotels = await loadHotels(cityInfo);
    res.json(hotels);
  }catch(e) {
    throw new Error('hotel error');
  }
});

app.get("/api/events", async (req, res) => {
  // const events = await getEvents();
  // res.json(events);
  res.sendStatus(200);
});


module.exports = app;