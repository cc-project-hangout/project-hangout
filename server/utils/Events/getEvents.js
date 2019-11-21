const axios = require("axios");
var convert = require("xml-js");
require("dotenv").config();
const getEvents = (city, date) => {
  const eventsFromEventful = eventsFromEventfulApi(city, date);
  const eventsFromTcketmaster = eventsFromTicketmasterApi(city, date);
  return Promise.all([eventsFromEventful, eventsFromTcketmaster]).then(values => {
    const allEvents = [...values[0], ...values[1]];
    return allEvents;
  });
};
const eventsFromEventfulApi = (city, date) => {
  return axios
    .get(
      `https://community-eventful.p.rapidapi.com/events/search?location=${city}&date=${date}&app_key=${process.env.EVENTFUL_API_APP_KEY}`,
      {
        headers: {
          "x-rapidapi-host": "community-eventful.p.rapidapi.com",
          "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
        },
      }
    )
    .then(res => {
      const arrayOfInfoWeNeed = [];
      const arrayOfEventArray = convert.xml2js(res.data, {
        compact: true,
        spaces: 2,
      }).search.events.event;
      arrayOfEventArray.forEach(eventfulObj => {
        const sortedObj = {
          title: eventfulObj["title"]["_text"],
          image: eventfulObj["image"]["url"],
          venue: eventfulObj["venue_name"]["_text"],
          url: eventfulObj["venue_url"]["_text"],
          description: eventfulObj["description"]["_text"],
          startTime: eventfulObj["start_time"]["_text"],
        };
        if (sortedObj["image"] !== undefined) {
          sortedObj["image"] = sortedObj["image"]["_text"];
        } else {
          sortedObj["image"] = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png";
        }
        arrayOfInfoWeNeed.push(sortedObj);
      });
      return arrayOfInfoWeNeed;
    });
};
const eventsFromTicketmasterApi = (city, date) => {
  const formatDate = date => {
    return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + "T09:00:00Z";
  };
  const formattedData = formatDate(date);
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?$startDateTime=city=${city}&&apikey=${process.env.TICKETMASTER_API_KEY}`
    )
    .then(res => {
      const arrayOfInfoWeNeed = [];
      const data = res.data._embedded.events[0];
      const arrayOfEventArray = res.data._embedded.events;
      arrayOfEventArray.forEach(ticketMasterObj => {
        const sortedObj = {
          title: ticketMasterObj["name"],
          image: ticketMasterObj["images"][0]["url"],
          venue: ticketMasterObj["_embedded"]["venues"][0]["name"],
          url: ticketMasterObj["url"],
          description: "More detail on the link",
          startTime: ticketMasterObj["dates"]["start"]["localDate"],
        };
        arrayOfInfoWeNeed.push(sortedObj);
      });

      return arrayOfInfoWeNeed;
    });
};
module.exports = {
  getEvents,
};
