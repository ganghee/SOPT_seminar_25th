const express = require('express'); 
const router = express.Router({mergeParams: true});
const LoggedIn = require('../../modules/utils/authUtil');

router.use('/', require('./jwtTest'));

module.exports = router;