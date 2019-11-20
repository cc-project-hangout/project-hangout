const unirest = require("unirest");
var convert = require("xml-js");

const getEvents = (city, date) => {
  const req = unirest(
    "GET",
    "https://community-eventful.p.rapidapi.com/events/search"
  );

  req.query({
    location: city,
    date: date,
    app_key: "Kt6kcJL4XfPs4wp5"
  });

  req.headers({
    "x-rapidapi-host": "community-eventful.p.rapidapi.com",
    "x-rapidapi-key": "9c43912371msh14d997739e2be0fp16cc17jsn6def561079f0"
  });

  let arrayOfInfoWeNeed = [];

  req.end(function(res) {
    if (res.error) throw new Error(res.error);

    const arrayOfEventObj = convert.xml2js(res.body, {
      compact: true,
      spaces: 4
    }).search.events.event;

    arrayOfEventObj.forEach(eventfulObj => {
      const sortedObj = {
        title: eventfulObj["title"]["_text"],
        image: eventfulObj["image"],
        venue: eventfulObj["venue_name"]["_text"],
        url: eventfulObj["venue_url"]["_text"],
        description: eventfulObj["description"]["_text"],
        startTime: eventfulObj["start_time"]["_text"]
      };

      arrayOfInfoWeNeed.push(sortedObj);
    });

    console.log(arrayOfInfoWeNeed);
    return arrayOfInfoWeNeed;
  });
};

//TEST
getEvents("Tokyo", "2020061000-2020061100");
