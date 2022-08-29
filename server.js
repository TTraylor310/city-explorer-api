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
