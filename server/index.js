const express = require("express");
const path = require("path");
const app = express();
const { loadHotels } = require("./utils/Hotels/loadHotels");
const { getEvents } = require("./utils/Events/getEvents");

// const morgan = require("morgan");
// app.use(morgan("dev"));

app.use("/api", express.json(), express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../build/")));

app.post("/api/hotels", async (req, res) => {
  try {
    const cityInfo = req.body;
    const hotels = await loadHotels(cityInfo);
    res.json(hotels);
  } catch (e) {
    throw new Error("hotel error");
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const events = await getEvents(req.body.city, req.body.date);
    // console.log(`events in server`, events);
    res.json(events);
  } catch (e) {
    throw new Error("event error");
  }
});

module.exports = app;
