const Planet = require('../models/planet');

exports.findAll = (req, res) => {
    Planet.find()
    .then(planets => {
        res.send(planets);
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

exports.findOne = (req, res) => {
    Planet.findById(req.params.id)
    .then(planet => {
        if(planet) {
            return res.send(planet);
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}


exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send(
            {message : "Name can't be empty"}
        );
    }

    const planet = new Planet({
        name : req.body.name
    })
    planet.save()
    .then(newPlanet => {
        res.send({
            message: "Created a new planet",
            planet : newPlanet
        })
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}


exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({ message: "Name can't be empty"});
    }

    Planet.updateName(req.params.id,req.body.name)
    .then(planet => {
        if(planet) {
            return res.send(planet);
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}


exports.deleteOne = (req, res) => {
    Planet.findByIdAndRemove(req.params.id)
    .then(planet => {
        if(planet) {
            return res.send({
                message : "Deleted successfully",
                deleted : planet
            });
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

exports.deleteAll = (req, res) => {
    Planet.remove({})
    .then(planets => {
        return res.send({
            message : "Removed all planets"
        })
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}