const axios = require("axios");
require("dotenv").config();

const storeDestIdOfLargestCity = async cityName => {
  const cities = await axios.get(
    `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=${cityName}`,
    {
      headers: {
        "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    }
  );
  if (cities === undefined) return "";

  const destId = cities.data.reduce((a, c) => {
    if (a === 0) a = c;
    if (c.hotels > a.hotels) a = c;
    return a;
  }, 0).dest_id;

  return destId;
};

const fetchHotels = async (city, destId) => {
  const locations = await axios.get(
    `https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&travel_purpose=leisure&categories_filter=price${city.minPrice}-${city.maxPrice}&free_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&search_id=none&order_by=popularity&children_qty=2&languagecode=en-us&children_age=5%2C7&search_type=city&offset=0&dest_ids=${destId}&guest_qty=1&arrival_date=${city.arrivalDate}&departure_date=${city.departureDate}&room_qty=1`,
    {
      headers: {
        "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.HOTEL_API_KEY,
      },
    }
  );

  return locations.data.result.map(hotel => {
    if (hotel.available_rooms > 0) {
      return {
        minTotalPrice: hotel.min_total_price,
        currencyCode: hotel.currency_code,
        address: hotel.address,
        city: hotel.city_trans,
        zip: hotel.zip,
        photos: hotel.main_photo_url,
        hotelName: hotel.hotel_name,
        reviewScore: hotel.review_score,
        roomsLeft: hotel.available_rooms,
      };
    }
  });
};

const loadHotels = async cityInfo => {
  const destId = await storeDestIdOfLargestCity(cityInfo.city);
  const cities = await fetchHotels(cityInfo, destId);
  return cities;
};

module.exports = {
  loadHotels,
};
