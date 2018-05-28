const axios = require('axios');

exports.fetchSpecie = (name) => {
    return axios.get('https://swapi.co/api/species/?search=' + name);
}