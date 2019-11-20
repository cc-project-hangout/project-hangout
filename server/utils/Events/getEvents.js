const unirest = require("unirest");
var convert = require("xml-js");

const getEvents = (city, date) => {
  const req = unirest(
    "GET",
    "https://community-eventful.p.rapidapi.com/events/search"
  );

  req.query({
    // keywords: keywords,
    location: city,
    // category: category,
    date: date,
    app_key: "Kt6kcJL4XfPs4wp5"
  });

  req.headers({
    "x-rapidapi-host": "community-eventful.p.rapidapi.com",
    "x-rapidapi-key": "9c43912371msh14d997739e2be0fp16cc17jsn6def561079f0"
  });

  req.end(function(res) {
    if (res.error) throw new Error(res.error);

    //do it map
    const result = convert.xml2js(res.body, { compact: true, spaces: 4 });
    console.log(`title`, result.search.events.event[0].title._text);
    console.log(`start time`, result.search.events.event[0].start_time._text);
    console.log(`venue name`, result.search.events.event[0].venue_name._text);
    console.log(`venue url`, result.search.events.event[0].venue_url._text);
    console.log(`description`, result.search.events.event[0].description._text);
    console.log(`image url`, result.search.events.event[0].image.url._text);
  });
};

//TEST
getEvents("Tokyo", "2019112000");
