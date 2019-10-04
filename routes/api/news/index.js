var express = require('express');
var router = express.Router();

router.use('/news', require('./news'));
router.use('/like', require('./like'));

console.log('trace: /api/news/index.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/news/index"
    })
})

module.exports = router;