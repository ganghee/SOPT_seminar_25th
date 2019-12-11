const express = require('express');
const router = express.Router({mergeParams: true});
const AllContentsController = require('../controllers/allContentsController');

router.get('/articles',AllContentsController.readAllArticle)
router.get('/comments',AllContentsController.readAllComment)

module.exports = router;