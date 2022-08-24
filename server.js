'use strict';

// const { response } = require('express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

let data = require('./data/weather.json');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  // console.log('welcome to atlanta');
  response.status(200).send('Welcome');
});







app.get('/weather', (request, response, next) => {
  try{

    let dataToGroom = data.find(value => value.city_name.toLowerCase() === request.query.city.toLowerCase());

    // console.log(dataToGroom);
    // let newDataToSend = dataToGroom.map(val => {
    //   return new CityInfo (val)
    // });

    let dataToSend = dataToGroom.data.map(val => {
      return new Forecast(val);
    });

    response.status(200).send(dataToSend);

  } catch (error){
    next (error);
  }
});

class Forecast {
  constructor (obj) {
    // this.city = obj.
    // this.city = weatherObj.city_name;
    this.date = obj.valid_date;
    this.description = obj.weather.description;
  }
  // let cityPicked = data.find(value => value.city_name);
}

// class CityInfo {
//   constructor (obj) {
//     this.city = obj.
//   }
// }


//must be at bottom
app.get('*', (request, response) => {
  response.status(404).send('Does Not Exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are on: ${PORT}`));
