const Planet = require('../models/planet');
const fetchSpecies = require('../libs/fetchSpecies');

//Finds all species in a planet
exports.findAll = (req, res) => {
    Planet.findById(req.params.id)
    .then(planet => {
        if(planet) {
            return res.send(planet.species);
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

//finds one species in a planet, with param "name"
exports.findOne = (req, res) => {
    Planet.findOneSpecies(req.params.id, req.params.name, (err, result) => {
        if(!err) {
            if(result) {
                return res.send(result);
            } else {
                return res.status(404).send({ message: "Species with given name not found :("});
            }
        }
        res.status(500).send({ message: err.message});
    });
}

/*
 * Creates a new species for a planet. 
 * This species needs to be found in SWapi 
 */
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send(
            {message : "Name can't be empty"}
        );
    }

    fetchSpecies.fetchSpecies(req.body.name)
    .then(response => {
        var specie = response.data.results[0];
        if(specie) {
            Planet.updateAddSpecie(req.params.id, specie)
            .then(planet => {
                if(planet) {
                    return res.send(planet);
                }
                return res.status(404).send({ message: "Planet not found :("});
            }).catch(err => {
                return res.status(500).send({ message: err.message});
            });
        } else {
            res.status(404).send({ message: "No such species in SWapi :("});
        }
    }).catch(err => {
        return res.status(500).send({ message: err.message});
    });

}


/*
* Updates the species with given values.
*
* Example values in JSON:
*   {"changedValues": {
*	"species.$.name" : "New name for the species"
*   }}
*
* NOTE:
* value name is expected to be species.$.VALUENAME for modifying existing values
* and
* species.0.NEWVALUENAME for adding new values
*/
exports.update = (req, res) => {
    if(!req.body.changedValues) {
        return res.status(400).send({ message: "Name can't be empty"});
    }

    Planet.updateSpecies(req.params.id, req.params.name, req.body.changedValues)
    .then(planet => {
        if(planet) {
            return res.send(planet);
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

//Deletes species with given name from a planet
exports.deleteOne = (req, res) => {
    if(!req.params.name) {
        return res.status(400).send(
            {message : "Name can't be empty"}
        );
    }
    Planet.updateRemoveSpecies(req.params.id, req.params.name)
    .then(planet => {
        if(planet) {
            return res.send({
                message: "Deleted species succesfully",
                planet : planet});
        }
        return res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        return res.status(500).send({ message: err.message});
    });
}

//Deletes all species from a planet
exports.deleteAll = (req, res) => {
    Planet.updateRemoveAllSpecies(req.params.id)
    .then(planet => {
        return res.send({
            message: "Deleted all species succesfully",
            planet : planet
        })

        return res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}