const express = require('express'); 
const router = express.Router({mergeParams: true});
const LoggedIn = require('../../Module/util/authUtil');


router.use('/', require('./jwtTest'));


module.exports = router;