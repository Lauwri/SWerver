const mongoose = require('mongoose');

const SpecieSchema = mongoose.Schema({
    name: String, 
    classification: String, 
    designation: String, 
    average_height: Number, 
    skin_colors: String, 
    hair_colors: String, 
    eye_colors: String, 
    average_lifespan: Number,
    language: String,
});


module.exports = mongoose.model('Specie', SpecieSchema);