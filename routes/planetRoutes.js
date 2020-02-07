const router = require('express').Router()

const planetController = require('../controllers/planetController');
const speciesController = require('../controllers/speciesController');



router.get('/', planetController.findAll);
router.get('/:id', planetController.findOne);


router.get('/:id/species', speciesController.findAll);
router.get('/:id/species/:name', speciesController.findOne);


router.post('/', planetController.create);
router.post('/:id/species', speciesController.create);


router.put('/:id', planetController.update);
router.put('/:id/species/:name', speciesController.update);


router.delete('/', planetController.deleteAll);
router.delete('/:id', planetController.deleteOne);

router.delete('/:id/species', speciesController.deleteAll);
router.delete('/:id/species/:name', speciesController.deleteOne);


module.exports = router;