require("dotenv").config();
const axios = require("axios");
const BOOKING_HOST = "apidojo-booking-v1.p.rapidapi.com";
const REST_COUNTRY_HOST = "ajayakv-rest-countries-v1.p.rapidapi.com";
const CURRENCY_CONVERTER_HOST = "currency-converter5.p.rapidapi.com";

const fetchRestCountry = async () => {
  try {
    const country = await axios.get(`https://${REST_COUNTRY_HOST}/rest/v1/all`, {
      headers: {
        "x-rapidapi-host": REST_COUNTRY_HOST,
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    });
    return country.data;
  } catch (e) {
    throw new Error(`REST country api couldn't fetch${e}`);
  }
};

const fetchCurrencyConverter = async (currencyCode, amount) => {
  try {
    const currency = await axios.get(`https://${CURRENCY_CONVERTER_HOST}/currency/convert`, {
      params: {
        format: "json",
        from: "USD",
        to: currencyCode,
        amount: amount,
      },
      headers: {
        "x-rapidapi-host": CURRENCY_CONVERTER_HOST,
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    });
    return Math.floor(Number(currency.data.rates[currencyCode]["rate_for_amount"]));
  } catch (e) {
    throw new Error(`currency converter api couldn't fetch${e}`);
  }
};

const fetchCities = async name => {
  try {
    const cities = await axios.get(`https://${BOOKING_HOST}/locations/auto-complete`, {
      params: {
        languagecode: "en-us",
        text: name,
      },
      headers: {
        "x-rapidapi-host": BOOKING_HOST,
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    });
    return cities.data.filter(city => city.dest_type === "city");
  } catch (e) {
    return [];
  }
};

const fetchFiltersList = async (destId, arrivalDate, departureDate) => {
  try {
    const filtersList = await axios.get(`https://${BOOKING_HOST}/filters/list`, {
      params: {
        children_qty: 2,
        languagecode: "en-us",
        children_age: "5%2C7",
        price_filter_currencycode: "USD",
        categories_filter: "price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2",
        arrival_date: arrivalDate,
        dest_ids: destId,
        departure_date: departureDate,
        guest_qty: 1,
        room_qty: 2,
        search_type: "city",
      },
      headers: {
        "x-rapidapi-host": BOOKING_HOST,
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    });

    return filtersList.data;
  } catch (e) {
    throw new Error(`Filter list couldn't fetch ${e}`);
  }
};

const fetchLocations = async array => {
  const [arrivalDate, departureDate, destId] = array;
  try {
    const locations = await axios.get(`https://${BOOKING_HOST}/properties/list`, {
      params: {
        price_filter_currencycode: "USD",
        travel_purpose: "leisure",
        categories_filter: "free_cancellation::1,class:0,class2",
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
        "x-rapidapi-host": BOOKING_HOST,
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    });
    return locations.data.result;
  } catch (e) {
    throw new Error(`Location data couldn't fetch ${e}`);
  }
};

module.exports = {
  fetchCities,
  fetchLocations,
  fetchFiltersList,
  fetchRestCountry,
  fetchCurrencyConverter,
};
