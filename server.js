'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const getWeather =require('./modules/Weather');
const getMovies = require('./modules/Movie');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, ()=> console.log(`We are on: ${PORT}`));

////////////////////////////////

app.get('/', (request, response) => {
  response.status(200).send('Welcome');
});

app.get('/weather', getWeather);

app.get('/movies',getMovies);

//must be at bottom
app.get('*', (request, response) => {
  response.status(404).send('Does Not Exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



// new lab 10 
// 'use strict';

// require('dotenv');
// const express = require('express');
// const cors = require('cors');

// const weather = require('./modules/weather.js');
// const app = express();

// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

// app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
