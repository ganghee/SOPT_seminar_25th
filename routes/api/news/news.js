var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/news"
    })
})

module.exports = router;