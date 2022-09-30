const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss.js');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('207.81.124.203', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', coords);
// });

// let latLong = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(latLong, (error, flyovers) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(`It worked! Returned flyover times for latitude: ${latLong.latitude} longitude: ${latLong.longitude}`, flyovers.response);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let times of passTimes.response) {
    console.log(`🔭 Next pass at ${Date(times.risetime)} for ${times.duration} seconds! 🔭`);
  }

});