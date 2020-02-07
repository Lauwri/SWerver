const mongoose = require('mongoose');

const PlanetSchema = mongoose.Schema({
    name: String,
    species: []
});

PlanetSchema.statics.findOneSpecies = function(id, name, done) {
    this.findById(id)
    .then(planet => {
        var found = planet.species.find(element => {
            return element.name === name
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

PlanetSchema.statics.updateSpecies = function(id, name, changedVals) {
    return this.update({_id : id, "species.name" : name}, 
    { "$set": changedVals });
}

PlanetSchema.statics.updateRemoveSpecies = function(id, specie) {
    return this.findByIdAndUpdate(id, { "$pull": 
    { species: {name : specie}}
    },{ new : true, safe : true });
}

PlanetSchema.statics.updateRemoveAllSpecies = function(id) {
    return this.findByIdAndUpdate(id, { "$set":
    { species: []}
    },{ new : true });
}


module.exports = mongoose.model('Planet', PlanetSchema);