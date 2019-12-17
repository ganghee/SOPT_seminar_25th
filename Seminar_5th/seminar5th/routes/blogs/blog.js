const express = require('express');
const router = express.Router({mergeParams: true});
const blogsControllers = require('../../controllers/blogsController');
const {LoggedIn} = require('../../modules/utils/authUtil');

router.get('/', blogsControllers.readAll);
router.get('/:blogIdx', blogsControllers.read);
router.post('/',LoggedIn, blogsControllers.create);
router.put('/', LoggedIn, blogsControllers.update);
router.delete('/', LoggedIn, blogsControllers.delete);

module.exports = router;