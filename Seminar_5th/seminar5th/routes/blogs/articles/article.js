const express = require('express');
const router = express.Router({mergeParams: true});
const upload = require('../../../config/multer')
const ArticlesController = require('../../../controllers/articlesControllers')
const {LoggedIn} = require('../../../modules/utils/authUtil');

router.get('/', ArticlesController.readAll);
router.get('/:articleIdx', ArticlesController.read);
router.post('/', LoggedIn, upload.array('image',3), ArticlesController.create);
router.put('/', LoggedIn, upload.array('image',3), ArticlesController.update);
router.delete('/', LoggedIn, ArticlesController.delete);

module.exports = router;