const express = require('express'); 
const router = express.Router();

router.use('/blogs', require('./blogs'));
router.get('/', function(req, res, next) {
    res.send({
        path: "/"
    });
});
console.log('/index.js');

module.exports = router;
