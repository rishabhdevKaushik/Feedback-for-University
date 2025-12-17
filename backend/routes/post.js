const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', authMiddlewere, postController.getAllPost);
router.get('/:id', authMiddlewere, postController.getPostById);
router.post('/add', authMiddlewere, postController.addPost);
router.put('/update/:id', authMiddlewere, postController.updatePostByID);
router.delete('/delete/:id', authMiddlewere, postController.deletePostById);
router.delete('/delete', authMiddlewere, postController.deleteAll);

router.put('/upvote/:id', authMiddlewere, postController.upvotePostById);

module.exports = router;
