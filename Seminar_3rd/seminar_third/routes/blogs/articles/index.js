const express = require('express'); 
const router = express.Router();

router.use('/', require('./article'));
router.use('/:articleIdx/comments', require('./comments'));

console.log('/index/blogs/articles/index.js');

module.exports = router;
