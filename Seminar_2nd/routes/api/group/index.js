const express = require('express');
const router = express.Router();

router.use('/group',require('./group'));
console.log('trace: /api/group/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({
        path: "/api/group/"
    });
});

module.exports = router;
