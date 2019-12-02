const express = require('express');
const router = express.Router({mergeParams: true});
const authControllers = require('../../controllers/authController');

router.post('/',authControllers.signup);
router.post('/',authControllers.signin);
router.put('/',authControllers.update);
router.delete('/',authControllers.delete);

module.exports = router;