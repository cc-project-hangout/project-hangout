const axios = require("axios");

var unirest = require("unirest");

var req = unirest
  .post("https://community-eventful.p.rapidapi.com/events/search")
  .headers({ Accept: "application/json", "Content-Type": "application/json" })
  .send(req.query);

req.query({
  keywords: "book",
  location: "Tokyo",
  category: "",
  date: "",
  app_key: "Kt6kcJL4XfPs4wp5"
});

// unirest
//   .post("https://community-eventful.p.rapidapi.com/events/search")
//   .headers({ Accept: "application/json", "Content-Type": "application/json" })
//   .send(req.query);

req.headers({
  "x-rapidapi-host": "community-eventful.p.rapidapi.com",
  "x-rapidapi-key": "9c43912371msh14d997739e2be0fp16cc17jsn6def561079f0"
});

req.end(function(res) {
  if (res.error) throw new Error(res.error);

  console.log(res);
  // console.log(JSON.parse(res.body));
});
