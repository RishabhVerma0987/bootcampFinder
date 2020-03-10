var NodeGeocoder = require("node-geocoder");

var options = {
  provider: process.env.GEOCODE_PROVIDER,
  httpAdapter: "https", // Default
  apiKey: process.env.GEOCODE_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

module.exports = geocoder;
