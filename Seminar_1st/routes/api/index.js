var express = require('express');
var router = express.Router();

router.use('/blog', require('./blog'));
router.use('/cafe', require('./cafe'));
router.use('/news', require('./news'));

console.log('trace: /api/index.js');
router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/index"
    })
})

module.exports = router;