var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.send('회원가입입니다');
});

module.exports = router;