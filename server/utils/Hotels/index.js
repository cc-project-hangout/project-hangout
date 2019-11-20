require("dotenv").config();
const axios = require("axios");

// const fetchLocations = () => {
//TODO: modify information
//   const http = require("https");
//   const options = {
// 	"method": "GET",
// 	"hostname": "apidojo-booking-v1.p.rapidapi.com",
// 	"port": null,
// 	"path": "/locations/auto-complete?languagecode=en-us&text=hanoi",
// 	"headers": {
// 		"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
// 		"x-rapidapi-key": HOTEL_API_KEY
// 	}
//   };
//   const req = http.request(options, (res) {
//     const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		var body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
//   });

//   req.end();

// }

const loadHotels = cityInfo => {
  //TODO: modify Information
  console.log(cityInfo);
  return cityInfo;
};

module.exports = {
  loadHotels
};
