const express = require('express'); 
const router = express.Router({mergeParams: true});
const CommentsControllers = require('../../../../controllers/commentsController')
const {LoggedIn} = require('../../../../modules/utils/authUtil');

router.get('/', CommentsControllers.readAll);
router.get('/:commentIdx', CommentsControllers.read);
router.post('/', LoggedIn, CommentsControllers.create);
router.put('/', LoggedIn, CommentsControllers.update);
router.delete('/', LoggedIn, CommentsControllers.remove);

module.exports = router;