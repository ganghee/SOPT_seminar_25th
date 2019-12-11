const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./article'));
router.use('/:articleIdx/comments', require('./comments'));

console.log('/blog/:blogIdx/articles');

module.exports = router;
