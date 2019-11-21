const { fetchCities } = require("./fetchApi");

const loadCities = async name => {
  const allCities = await fetchCities(name);
  return allCities.map(city => city.name);
};

module.exports = {
  loadCities,
};
