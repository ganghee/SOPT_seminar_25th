const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./comment'));

console.log('/index/blogs/articles/comments/index.js');

module.exports = router;
