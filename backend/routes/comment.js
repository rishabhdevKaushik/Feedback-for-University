const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', authMiddlewere, commentController.getAll);
router.get('/:id', authMiddlewere, commentController.getCommentById);
router.post('/add', authMiddlewere, commentController.addComment);
router.put('/update/:id', authMiddlewere, commentController.updateComment);
router.delete('/delete/:id', authMiddlewere, commentController.deleteComment);

module.exports = router;
