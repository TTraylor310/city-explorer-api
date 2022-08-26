'use strict';

const axios = require ('axios');

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

  try{
    const xweatherR = await axios.get(url, {params});
    const xweatherRArray = xweatherR.data.data.map(val => new WeatherInfo(val));
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
