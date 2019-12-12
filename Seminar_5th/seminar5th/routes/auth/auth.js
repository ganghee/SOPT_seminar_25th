const express = require('express');
const router = express.Router({mergeParams: true});
const authControllers = require('../../controllers/authController');


router.post('/signup',authControllers.signUp);
router.post('/signin',authControllers.signIn);
router.put('/',authControllers.update);
router.delete('/',authControllers.remove);

module.exports = router;