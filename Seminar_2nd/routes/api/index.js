const express = require('express');
const router = express.Router();

router.use('/group',require('./group'));
console.log('trace: /api/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({
        path: "/api/"
});
});

module.exports = router;
