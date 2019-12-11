const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./comment'));

console.log('/blog/:blogIdx/articles/:articleIdx/comments');

module.exports = router;
