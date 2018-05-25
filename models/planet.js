const mongoose = require('mongoose');

const PlanetSchema = mongoose.Schema({
    name: String,
    species: []
});

module.exports = mongoose.model('Planet', PlanetSchema);