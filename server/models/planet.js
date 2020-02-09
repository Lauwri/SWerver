const mongoose = require('mongoose');
const SpecieSchema = require('./specie')


const PlanetSchema = mongoose.Schema({
    name: String,
    species: [SpecieSchema.schema]
});

PlanetSchema.statics.findOneSpecies = function(id, sid, done) {
    this.findById(id)
    .then(planet => {
        var found = planet.species.find(element => {
            return element._id == sid
        })
        return done(null, found);
    }).catch(err => {
        return done(err);
    })
}



PlanetSchema.statics.updateName = function(id, newName) {
    return this.findByIdAndUpdate(id, {
        name : newName
    },{new : true});
}

PlanetSchema.statics.updateAddSpecies = function(id, specie) {
    return this.findByIdAndUpdate(id, { "$push": 
    { species: specie } 
    },{ new : true, upsert : true });
}

PlanetSchema.statics.updateSpecies = function(id, sid, changedVals) {
    return this.update({_id : id, "species._id" : sid}, 
    { "$set": changedVals });
}

PlanetSchema.statics.updateRemoveSpecies = function(id, sid) {
    return this.findByIdAndUpdate(id, { "$pull": 
    { species: {_id : sid}}
    },{ new : true, safe : true });
}

PlanetSchema.statics.updateRemoveAllSpecies = function(id) {
    return this.findByIdAndUpdate(id, { "$set":
    { species: []}
    },{ new : true });
}


module.exports = mongoose.model('Planet', PlanetSchema);