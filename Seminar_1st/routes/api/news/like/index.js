var express = require('express');
var router = express.Router();

router.use('/like', require('./like'));

console.log('trace: /api/news/like/index.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/news/like/index"
    })
})

module.exports = router;