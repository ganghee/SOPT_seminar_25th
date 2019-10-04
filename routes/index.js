var express = require('express');
var router = express.Router();

console.log('trace: index.js');
router.use('/api', require('./api'));

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /"
    })
})

module.exports = router;