'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, ()=> console.log(`We are on: ${PORT}`));

////////////////////////////////

app.get('/', (request, response) => {
  response.status(200).send('Welcome');
});

app.get('/weather', getWeather);

async function getWeather(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  // const searchQuery = request.query.searchQuery;
  const url = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`;

  try{
    const xweatherR = await axios.get(url);
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

//must be at bottom
app.get('*', (request, response) => {
  response.status(404).send('Does Not Exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
