const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./multerTest'));


module.exports = router;