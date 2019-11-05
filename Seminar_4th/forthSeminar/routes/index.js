const express = require('express'); 
const router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/',require('./allContents'))
console.log('/index.js');

module.exports = router;
