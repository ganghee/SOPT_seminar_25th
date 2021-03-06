const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./blog'));
router.use('/:blogIdx/articles', require('./articles'));

console.log('/blogs');

module.exports = router;
