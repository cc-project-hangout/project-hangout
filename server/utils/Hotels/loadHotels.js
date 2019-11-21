const { fetchCities, fetchLocations } = require("./fetchApi");

const storeDestIdOfLargestCity = async cityName => {
  const allCities = await fetchCities(cityName);
  if (allCities === undefined) return "";
  const destId = allCities.reduce((a, c) => {
    if (a === 0) a = c;
    if (c.hotels > a.hotels) a = c;
    return a;
  }, 0).dest_id;

  return destId;
};

const fetchHotels = async (city, destId) => {
  const alllocations = await fetchLocations(city.minPrice, city.maxPrice, city.arrivalDate, city.departureDate, destId);

  return alllocations.map(hotel => {
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
