var express = require('express');
var router = express.Router();

console.log('trace: /api/cafe/cafe.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/cafe/cafe"
    })
})

module.exports = router;