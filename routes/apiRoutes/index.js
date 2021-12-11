const router = require('express').Router();
const dbRoutes = require('../apiRoutes/dbRoutes');

router.use(dbRoutes);
module.exports = router;
