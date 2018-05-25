const operations = require('../libs/planetOperations');
const fetchSpecie = require('../libs/fetchSpecie');

//Finds all species in a planet
exports.findAll = (req, res) => {
    operations.findOne(req.params.id)
    .then(planet => {
        if(planet) {
            return res.send(planet.species);
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

//finds one specie in a planet, with param "name"
exports.findOne = (req, res) => {
    operations.findOne(req.params.id)
    .then(planet => {
        if(planet) {
            var found = planet.species.find(element => {
                return element.name === req.params.name
            })

            if(found) {
                return res.send(found);
            }
            return res.status(404).send({ message: "Specie with given name not found :("});
        }
        res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}

/*
 * Creates a new specie for a planet. 
 * This specie needs to be found in SWapi 
 */
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send(
            {message : "Name can't be empty"}
        );
    }

    fetchSpecie.fetchSpecie(req.body.name)
    .then(response => {
        var specie = response.data.results[0];
        if(specie) {
            operations.updateAddSpecie(req.params.id, specie)
            .then(planet => {
                if(planet) {
                    return res.send(planet);
                }
                return res.status(404).send({ message: "Planet not found :("});
            }).catch(err => {
                return res.status(500).send({ message: err.message});
            });
        } else {
            res.status(404).send({ message: "Specie not found :("});
        }
    }).catch(err => {
        return res.status(500).send({ message: err.message});
    });

}


/*
* Updates the specie with given values.
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

    operations.updateSpecie(req.params.id, req.params.name, req.body.changedValues)
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
    operations.updateRemoveSpecie(req.params.id, req.params.name)
    .then(planet => {
        if(planet) {
            return res.send(planet);
        }
        return res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        return res.status(500).send({ message: err.message});
    });
}

//Deletes all species from a planet
exports.deleteAll = (req, res) => {
    operations.updateRemoveAllSpecies(req.params.id)
    .then(planet => {
        return res.send({
            planet : planet
        })

        return res.status(404).send({ message: "Planet not found :("});
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
}