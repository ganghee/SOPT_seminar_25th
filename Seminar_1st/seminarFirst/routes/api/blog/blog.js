var express = require('express');
var router = express.Router();

console.log('trace: /api/blog/blog.js');

router.get('/', (req, res)=>{
    res.status(200).send({ 
        message: "this is /api/blog/blog"
    })
})

module.exports = router;