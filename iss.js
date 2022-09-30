const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body);
    callback(null, ip.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coords = JSON.parse(body);
    if (!coords.success) {
      (error = `Error! Server says: ${coords.message} for IP Address: ${ip}. Please try again.`);
      callback(error, null);
      return;
    }
    // const {latitude, longitude} = coords          <=== another way to do this
    // const latLong = { latitude, longitude }
    const latLong = { latitude: coords.latitude, longitude: coords.longitude };
    callback(null, latLong);
  });
};

const fetchISSFlyOverTimes = function(latLong, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${latLong.latitude}&lon=${latLong.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyovers = JSON.parse(body);
    callback(null, flyovers);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyovers) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyovers);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };