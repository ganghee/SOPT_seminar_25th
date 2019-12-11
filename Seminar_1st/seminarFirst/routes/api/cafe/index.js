var express = require('express');
var router = express.Router();

router.use('/cafe', require('./cafe'));

console.log('trace: /api/cafe/index.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/cafe/index"
    })
})

module.exports = router;