const express = require('express'); 
const router = express.Router({mergeParams: true});
const LoggedIn = require('../../module/utils/authUtil');


router.use('/', require('./jwtTest'));


module.exports = router;