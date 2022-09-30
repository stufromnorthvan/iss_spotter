const request = require('request-promise-native');

const fetchMyIP = function() {
  // return new Promise((resolve, reject))
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ipObj) {
  const ip = JSON.parse(ipObj).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(coordsObj) {
  const coords = JSON.parse(coordsObj);
  const latLong = { latitude: coords.latitude, longitude: coords.longitude };
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latLong.latitude}&lon=${latLong.longitude}`);
};


const nextISSTimesForMyLocation = function() {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(flyOverData => {
      for (let times of JSON.parse(flyOverData).response) {
        console.log(`🔭 Next pass at ${Date(times.risetime)} for ${times.duration} seconds! 🔭`);
    }
  }).catch((error) => {
    console.log("UH OH! Looks like you messed up pal. See details here: ", error.message);
    });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

