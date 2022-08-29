'use strict';

const axios = require ('axios');


// let cache = {};


async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  // let searchFF = request.query.searchQuery;
  let url =`http://api.weatherbit.io/v2.0/current`;

  let params = {

    lat,
    lon,
    key: process.env.REACT_APP_WEATHERBIT_API_KEY,
  };
  console.log('line 16: ', url);

  try{
    console.log(url);
    const xweatherR = await axios.get(url, {params});
    console.log(xweatherR);
    const xweatherRArray = xweatherR.data.data.map(val => new WeatherInfo(val));
    console.log(xweatherRArray);

    response.status(200).send(xweatherRArray);
  } catch (error) {
    console.log('error message13', error);
    response.status(500).send('server error99');
  }


}

class WeatherInfo{
  constructor (obj) {
    // this.city_name = obj.city_name;
    this.sunrise = obj.sunrise;
    this.sunset = obj.sunset;
    this.app_temp = obj.app_temp;
    this.description = obj.weather.description;
  }
}
module.exports = getWeather;



// from lab 10
'use strict';

// let cache = require('./cache.js');

// module.exports = getWeather;

// function getWeather(latitude, longitude) {
//   const key = 'weather-' + latitude + longitude;
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

//   if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache hit');
//   } else {
//     console.log('Cache miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = axios.get(url)
//     .then(response => parseWeather(response.data));
//   }

//   return cache[key].data;
// }

// function parseWeather(weatherData) {
//   try {
//     const weatherSummaries = weatherData.data.map(day => {
//       return new Weather(day);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }

// class Weather {
//   constructor(day) {
//     this.forecast = day.weather.description;
//     this.time = day.datetime;
//   }
// }
