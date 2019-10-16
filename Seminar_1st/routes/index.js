var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));

console.log('trace: index.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /"
    })
})

module.exports = router;