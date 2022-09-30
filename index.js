const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss.js');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let times of passTimes.response) {
    console.log(`🔭 Next pass at ${Date(times.risetime)} for ${times.duration} seconds! 🔭`);
  }

});