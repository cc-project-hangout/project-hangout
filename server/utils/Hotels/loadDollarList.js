const { fetchFiltersList, fetchCities } = require("./fetchApi");
const moment = require("moment");

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

const loadDollarList = async name => {
  console.log(name);
  const distId = await storeDestIdOfLargestCity(name);
  const dammyArrivalDate = moment().format("YYYY-MM-DD");
  const dammyDepartureDate = moment()
    .add(1, "days")
    .format("YYYY-MM-DD");
  console.log(distId, dammyDepartureDate, dammyDepartureDate);
  const filtersList = await fetchFiltersList(distId, dammyArrivalDate, dammyDepartureDate);
  return filtersList.filter[1]["categories"].map(category => category.name);
};

module.exports = {
  loadDollarList,
};
