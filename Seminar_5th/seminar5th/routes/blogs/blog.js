const express = require('express');
const router = express.Router({mergeParams: true});
const blogsControllers = require('../../controllers/blogsController');
const {LoggedIn} = require('../../modules/utils/authUtil');

router.get('/',blogsControllers.readAll);
router.get('/:blogIdx',blogsControllers.read);
router.use('/',LoggedIn);
router.post('/',blogsControllers.create);
router.put('/',blogsControllers.update);
router.delete('/',blogsControllers.remove);

module.exports = router;