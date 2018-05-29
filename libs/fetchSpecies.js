const axios = require('axios');

exports.fetchSpecies = (name) => {
    return axios.get('https://swapi.co/api/species/?search=' + name);
}