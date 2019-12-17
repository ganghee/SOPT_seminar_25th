const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./comment'));

console.log('/blogs/:blogIdx/articles/:articleIdx/comments');

module.exports = router;
