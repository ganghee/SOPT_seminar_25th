const express = require('express');
const router = express.Router();

router.use('/api',require('./api'));
console.log('trace: index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    path: "/"
  });
});

module.exports = router;
