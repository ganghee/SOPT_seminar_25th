const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:groupIdx', function(req, res, next) {
    res.send({
        path: "/api/group/kk"
    });
});

module.exports = router;
