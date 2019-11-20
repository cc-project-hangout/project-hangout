// const unirest = require("unirest");
const axios = require("axios");
var convert = require("xml-js");
require("dotenv").config();

const getEvents = async (city, date) => {
  //rakuten eventful-api
  const events = await axios.get(
    `https://community-eventful.p.rapidapi.com/events/search?location=${city}&date=${date}&app_key=${process.env.EVENTFUL_API_APP_KEY}`,
    {
      headers: {
        "x-rapidapi-host": "community-eventful.p.rapidapi.com",
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
      }
    }
  );

  const arrayOfEventObj = convert.xml2js(events.data, {
    compact: true,
    spaces: 4
  }).search.events.event;

  let arrayOfInfoWeNeed = [];

  //ticketmaster-api
  // const countryCode = "US";
  axios(
    // `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=${process.env.TICKETMASTER_API_KEY}`
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}`
  ).then(function(res) {
    const data = res.data._embedded.events[0];
    console.log("**********************");
    console.log(`res`, res);
    console.log("**********************");
    console.log(`data`, data);

    const sortedObj = {
      title: data["name"],
      image: data["images"][0]["url"],
      venue: data["_embedded"]["venues"][0]["name"],
      url: data["url"],
      description: "More detail on the link",
      startTime: data["dates"]["start"]["localDate"]
    };
    arrayOfInfoWeNeed.push(sortedObj);
  });

  arrayOfEventObj.forEach(eventfulObj => {
    const sortedObj = {
      title: eventfulObj["title"]["_text"],
      image: eventfulObj["image"]["url"],
      venue: eventfulObj["venue_name"]["_text"],
      url: eventfulObj["venue_url"]["_text"],
      description: eventfulObj["description"]["_text"],
      startTime: eventfulObj["start_time"]["_text"]
    };
    if (sortedObj["image"] !== undefined) {
      sortedObj["image"] = sortedObj["image"]["_text"];
    } else {
      sortedObj["image"] =
        "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png";
    }
    arrayOfInfoWeNeed.push(sortedObj);
  });
  return arrayOfInfoWeNeed;
};

module.exports = {
  getEvents
};
