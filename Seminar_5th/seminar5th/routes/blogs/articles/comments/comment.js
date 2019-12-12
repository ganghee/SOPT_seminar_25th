const express = require('express'); 
const router = express.Router({mergeParams: true});
const CommentsControllers = require('../../../../controllers/commentsController')
const {LoggedIn} = require('../../../../modules/utils/authUtil');

router.get('/',CommentsControllers.readAll);
router.get('/:commentIdx',CommentsControllers.read);
router.use('/',LoggedIn);
router.post('/',CommentsControllers.create);
router.put('/',CommentsControllers.update);
router.delete('/',CommentsControllers.update);

module.exports = router;