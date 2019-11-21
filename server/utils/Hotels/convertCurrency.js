const { fetchRestCountry, fetchCurrencyConverter } = require("./fetchApi");

const convertCurrency = async (countryName, minPrice, maxPrice) => {
  const allCountries = await fetchRestCountry();
  const filteredCountry = allCountries.filter(country => country.name === countryName);
  if (filteredCountry.length === 0) return new Error(`Couldn't get country`);
  const currencyCode = filteredCountry[0]["currencies"][0];

  const convertedMinPrice = await fetchCurrencyConverter(currencyCode, minPrice);
  const convertedMaxPrice = await fetchCurrencyConverter(currencyCode, maxPrice);

  return { convertedMinPrice, convertedMaxPrice };
};

module.exports = {
  convertCurrency,
};
