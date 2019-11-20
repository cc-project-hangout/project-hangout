const express = require("express");
const path = require("path");
const app = express();
// const {getEvents} = require('./utils/Events/getEvents');
// const {getHotels} = require('./utils/Hotels');

// const morgan = require("morgan");
// app.use(morgan("dev"));

app.use("/api", express.json(), express.urlencoded({ extended: true }));
// app.use("/api", express.json(), express.urlencoded({ extended: true }), api);

app.use(express.static(path.join(__dirname, "../build/")));

app.post("/api/hotels", async (req, res) => {
  // const hotels = await getHotels();
  // res.json(hotels);
  res.sendStatus(200);
});

app.get("/api/events", async (req, res) => {
  // const events = await getEvents();
  // res.json(events);
  res.sendStatus(200);
});


module.exports = app;