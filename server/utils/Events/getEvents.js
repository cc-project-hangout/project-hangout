// const unirest = require("unirest");
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
  console.log("start eventful");
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
      console.log("finish eventful");
      // console.log(`array we need`, arrayOfInfoWeNeed);
      return arrayOfInfoWeNeed;
    });
};

const eventsFromTicketmasterApi = (city, date) => {
  const formatDate = date => {
    return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
  };
  const formattedData = formatDate(date);
  console.log(`formattedData`, formattedData);

  // const countryCode = "US";

  // `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=iaQO4AwkJX6SRwqiuoeSMBoOANkvVap3`
  // `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}`
  // `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${formattedData}&apikey=${process.env.TICKETMASTER_API_KEY}`
  // `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&localStartDateTime=${formattedData}&apikey=${process.env.TICKETMASTER_API_KEY}`
  // `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&&apikey=${process.env.TICKETMASTER_API_KEY}`

  return axios
    .get(
      // `https://app.ticketmaster.com/discovery/v2/events.json?$starDateTime="2019-12-04T14:00:00Z"&&apikey=${process.env.TICKETMASTER_API_KEY}`
      `https://app.ticketmaster.com/discovery/v2/events.json?$endDateTime="2019-12-04T14:00:00Z"&&apikey=${process.env.TICKETMASTER_API_KEY}`
      // `https://app.ticketmaster.com/discovery/v2/events.json?$startDateTime=${formattedData}&&apikey=${process.env.TICKETMASTER_API_KEY}`
      // `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&&startDateTime=${formattedData}&&apikey=${process.env.TICKETMASTER_API_KEY}`
    )
    .then(res => {
      const arrayOfInfoWeNeed = [];
      console.log("the second api is working");
      const data = res.data._embedded.events[0];
      // console.log(res.data._embedded.events);
      console.log(`data`, data);
      const sortedObj = {
        title: data["name"],
        image: data["images"][0]["url"],
        venue: data["_embedded"]["venues"][0]["name"],
        url: data["url"],
        description: "More detail on the link",
        startTime: data["dates"]["start"]["localDate"],
      };
      // console.log(sortedObj);
      arrayOfInfoWeNeed.push(sortedObj);
      // console.log(arrayOfInfoWeNeed);
      console.log("finish second function");
      // console.log("array from ticketmaster", arrayOfInfoWeNeed);
      return arrayOfInfoWeNeed;
    });
};

module.exports = {
  getEvents,
};
