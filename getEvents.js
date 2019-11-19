const unirest = require("unirest");
var convert = require("xml-js");

const getEvents = (keywords, location, category, date) => {
  const req = unirest(
    "GET",
    "https://community-eventful.p.rapidapi.com/events/search"
  );

  req.query({
    keywords: keywords,
    location: location,
    category: category,
    date: date,
    app_key: "Kt6kcJL4XfPs4wp5"
  });

  req.headers({
    "x-rapidapi-host": "community-eventful.p.rapidapi.com",
    "x-rapidapi-key": "9c43912371msh14d997739e2be0fp16cc17jsn6def561079f0"
  });

  req.end(function(res) {
    if (res.error) throw new Error(res.error);

    const result = convert.xml2js(res.body, { compact: true, spaces: 4 });
    console.log(result.search.events.event[0].title);
  });
};

//TEST
getEvents("book", "Tokyo");
