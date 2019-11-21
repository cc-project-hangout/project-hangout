const axios = require("axios");
require("dotenv").config();

const fetchCities = name =>
  axios.get("https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete", {
    params: {
      languagecode: "en-us",
      text: name,
    },
    headers: {
      "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.HOTEL_API_KEY,
    },
  });

const fetchLocations = (minPrice, maxPrice, arrivalDate, departureDate, destId) =>
  axios.get("https://apidojo-booking-v1.p.rapidapi.com/properties/list", {
    params: {
      price_filter_currencycode: "USD",
      travel_purpose: "leisure",
      categories_filter: `price${minPrice}-${maxPrice}`,
      free_cancellation: "%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2",
      search_id: "none",
      order_by: "popularity",
      children_qty: 2,
      languagecode: "en-us",
      children_age: "5%2C7",
      search_type: "city",
      offset: 0,
      dest_ids: destId,
      guest_qty: 1,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      room_qty: 1,
    },
    headers: {
      "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.HOTEL_API_KEY,
    },
  });

module.exports = {
  fetchCities,
  fetchLocations,
};
