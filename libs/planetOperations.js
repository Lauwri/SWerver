const Planet = require('../models/planet');

exports.findAll = () => {
    return Planet.find();
}

exports.findOne = (id) => {
    return Planet.findById(id);
}




exports.create = (newName) => {
    const planet = new Planet({
        name : newName
    })

    return planet.save();
}




exports.updateName = (id, newName) => {
    return Planet.findByIdAndUpdate(id, {
        name : newName
    },{new : true});
}

exports.updateAddSpecie = (id, specie) => {
    return Planet.findByIdAndUpdate(id, { "$push": 
    { species: specie } 
    },{ new : true, upsert : true });
}

exports.updateSpecie = (id, name, changedVals) => {
    console.log(changedVals);
    return Planet.update({_id : id, "species.name" : name}, 
    { "$set": changedVals });
}

exports.updateRemoveSpecie = (id, specie) => {
    return Planet.findByIdAndUpdate(id, { "$pull": 
    { species: {name : specie}}
    },{ new : true, safe : true });
}

exports.updateRemoveAllSpecies = (id) => {
    return Planet.findByIdAndUpdate(id, { "$set":
    { species: []}
    },{ new : true });
}




exports.deleteOne = (id) => {
    return Planet.findByIdAndRemove(id);
}

exports.deleteAll = () => {
    return Planet.remove({});
}