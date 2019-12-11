const express = require('express');
const router = express.Router({mergeParams: true});
const upload = require('../../../config/multer')
const ArticlesController = require('../../../controllers/articlesControllers')
const {LoggedIn} = require('../../../modules/utils/authUtil');

router.get('/',ArticlesController.readAll);
router.get('/:articleIdx',ArticlesController.read);
router.use('/',LoggedIn);
router.post('/', upload.single('image'), ArticlesController.create);
router.put('/',ArticlesController.update);
router.delete('/',ArticlesController.remove);

module.exports = router;