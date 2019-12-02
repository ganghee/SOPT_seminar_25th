const express = require('express');
const router = express.Router({mergeParams: true});
const blogsControllers = require('../../controllers/blogsController');

router.get('/',blogsControllers.readAll);
router.get('/:blogIdx',blogsControllers.read);
router.post('/',blogsControllers.create);
router.put('/',blogsControllers.update);
router.delete('/',blogsControllers.remove);

module.exports = router;