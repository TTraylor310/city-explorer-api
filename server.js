'use strict';

const { response } = require('express');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  console.log('welcome to atlanta');
  response.status(200).send('Welcome');
});







//must be at bottom
app.get('*', (request, response) => {
  response.status(404).send('DNE');
});

app.listen(PORT, ()=> console.log(`We are on: ${PORT}`));
