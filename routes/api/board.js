var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/signin"
    })
})

module.exports = router;