const express = require('express');
const router = express.Router({mergeParams: true});
const authControllers = require('../../controllers/authController');
const {LoggedIn} = require('../../modules/utils/authUtil');

router.post('/signup',authControllers.signUp);
router.post('/signin',authControllers.signIn);
router.put('/',LoggedIn, authControllers.update);
router.delete('/',LoggedIn, authControllers.delete);

module.exports = router;