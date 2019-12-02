const express = require('express'); 
const router = express.Router({mergeParams: true});
const CommentsControllers = require('../../../../controllers/commentsController')

router.get('/',CommentsControllers.readAll);
router.get('/:commentIdx',CommentsControllers.read);
router.post('/',CommentsControllers.create);
router.put('/',CommentsControllers.update);
router.delete('/',CommentsControllers.update);

module.exports = router;