const express = require('express'); 
const router = express.Router();

router.use('/', require('./blog'));
router.use('/:blogIdx/articles', require('./articles'));

console.log('/index/blogs/index.js');

module.exports = router;
