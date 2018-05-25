const express = require('express')
const planetController = require('../controllers/planetController');
const speciesController = require('../controllers/speciesController');

var router = express.Router()

router.get('/planet', planetController.findAll);
router.get('/planet/:id', planetController.findOne);


router.get('/planet/:id/species', speciesController.findAll);
router.get('/planet/:id/species/:name', speciesController.findOne);


router.post('/planet', planetController.create);
router.post('/planet/:id/species', speciesController.create);


router.put('/planet/:id', planetController.update);
router.put('/planet/:id/species/:name', speciesController.update);


router.delete('/planet', planetController.deleteAll);
router.delete('/planet/:id', planetController.deleteOne);

router.delete('/planet/:id/species', speciesController.deleteAll);
router.delete('/planet/:id/species/:name', speciesController.deleteOne);


module.exports = router;