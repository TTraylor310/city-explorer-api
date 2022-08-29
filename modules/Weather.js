'use strict';

const axios = require ('axios');

let cache = {};

async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let url =`http://api.weatherbit.io/v2.0/current`;

  let params = {
    lat,
    lon,
    key: process.env.REACT_APP_WEATHERBIT_API_KEY,
  };
  const key = 'weather-' + lat + lon;

  try{

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Weather cache hit');
      response.status(200).send(cache[key].data);

    } else {
      console.log('Weather cache miss');
      const xweatherR = await axios.get(url, {params});
      const xweatherRArray = xweatherR.data.data.map(val => new WeatherInfo(val));
      cache[key] = {
        data: xweatherRArray,
        timestamp: Date.now(),
      };

      response.status(200).send(xweatherRArray);
    }

  } catch (error) {
    response.status(500).send('server error99');
  }

}

class WeatherInfo{
  constructor (obj) {
    this.sunrise = obj.sunrise;
    this.sunset = obj.sunset;
    this.app_temp = obj.app_temp;
    this.description = obj.weather.description;
  }
}
module.exports = getWeather;
