const { fetchRestCountry, fetchCurrencyConverter } = require("./fetchApi");

const convertCurrency = async (countryName, minPrice, maxPrice) => {
  if (countryName === "USA") return { convertedMinPrice: minPrice, convertedMaxPrice: maxPrice };
  const allCountries = await fetchRestCountry();
  const filteredCountry = allCountries.filter(country => country.name === countryName);
  const currencyCode = filteredCountry[0]["currencies"][0];

  const convertedMinPrice = await fetchCurrencyConverter(currencyCode, minPrice);
  const convertedMaxPrice = await fetchCurrencyConverter(currencyCode, maxPrice);

  return { convertedMinPrice, convertedMaxPrice };
};

module.exports = {
  convertCurrency,
};
