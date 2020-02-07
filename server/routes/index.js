const router = require('express').Router()

const planetRoutes = require('./planetRoutes');

router.use('/planet', planetRoutes);

module.exports = router;