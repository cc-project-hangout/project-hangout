// const unirest = require("unirest");
const axios = require("axios");
var convert = require("xml-js");

require("dotenv").config();

const getEvents = async (city, date) => {
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
<<<<<<< HEAD
      sortedObj["image"] = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
      ;
=======
      sortedObj["image"] = "./src/assets/default.png";
>>>>>>> 4b2ce0e2ee33c9688924c8723d329005475ace6c
    }
    arrayOfInfoWeNeed.push(sortedObj);
  });
  return arrayOfInfoWeNeed;
};

module.exports = {
  getEvents
};
