'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {
  let city = request.query.city;
  const url = `https://api.themoviedb.org/3/search/movie`;

  let params = {
    query: city,
    // page: 1,
    api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
  };

  try{
    // console.log(url);
    const movieR = await axios.get(url, {params});
    // console.log(movieR);
    const movieArr = movieR.data.results.map(val => new MovieInfo (val));
    // console.log(movieArr);
    response.status(200).send(movieArr);
  } catch (error) {
    response.status(500).send('server erro22');
  }
}

class MovieInfo{
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.overview = obj.overview;
    this.poster_path = obj.poster_path;
  }
}

module.exports = getMovies;
