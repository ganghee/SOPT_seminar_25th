var express = require('express');
var router = express.Router();

router.use('/board', require('./board'));
router.use('/auth', require('./auth'));

console.log('trace: /auth/index.js');
router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /auth/index"
    })
})

module.exports = router;