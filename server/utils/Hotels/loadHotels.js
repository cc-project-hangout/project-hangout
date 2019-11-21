const { fetchCities, fetchLocations } = require("./fetchApi");
const { convertCurrency } = require("./convertCurrency");

const storeCountryAndDestId = async cityName => {
  const city = await fetchCities(cityName);
  if (city === undefined) return "";

  return {
    destId: city[0].dest_id,
    country: city[0].country,
  };
};

const fetchHotels = async (city, destId) => {
  const allLocations = await fetchLocations(city.minPrice, city.maxPrice, city.arrivalDate, city.departureDate, destId);

  return allLocations.map(hotel => {
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
        url: hotel.url,
      };
    }
  });
};

const filterHotelsByCurrency = async (hotels, currency) =>
  hotels.filter(
    hotel =>
      Number(hotel.minTotalPrice) > currency.convertedMinPrice &&
      Number(hotel.minTotalPrice) < currency.convertedMaxPrice
  );

const loadHotels = async cityInfo => {
  const { destId, country } = await storeCountryAndDestId(cityInfo.city);
  const convertedCurrency = await convertCurrency(country, cityInfo.minPrice, cityInfo.maxPrice);
  const hotels = await fetchHotels(cityInfo, destId);
  const filteredHotels = filterHotelsByCurrency(hotels, convertedCurrency);
  return filteredHotels;
};

module.exports = {
  loadHotels,
};
