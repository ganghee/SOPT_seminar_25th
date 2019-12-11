var express = require('express');
var router = express.Router();

router.use('/blog', require('./blog'));

console.log('trace: /api/blog/index.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/blog/index"
    })
})

module.exports = router;