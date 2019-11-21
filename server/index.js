const express = require("express");
const path = require("path");
const app = express();
const { loadHotels, loadCities } = require("./utils/Hotels/index.js");
const { getEvents } = require("./utils/Events/getEvents");

app.use("/api", express.json(), express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../build/")));

app.post("/api/city", async (req, res) => {
  try {
    const cityName = req.body[0];
    const cities = await loadCities(cityName);
    res.json(cities);
  } catch (e) {
    res.json([]);
  }
});

app.post("/api/hotels", async (req, res) => {
  try {
    const cityInfo = req.body;
    const hotels = await loadHotels(cityInfo);
    res.json(hotels);
  } catch (e) {
    res.json([]);
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const events = await getEvents(req.body.city, req.body.date);
    res.json(events);
  } catch (e) {
    throw new Error("event error");
  }
});

module.exports = app;
