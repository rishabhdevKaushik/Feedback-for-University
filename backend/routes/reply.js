const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', authMiddlewere, replyController.getAllReplies);
router.get('/:id', authMiddlewere, replyController.getReplyById);
router.post('/add/:id', authMiddlewere, replyController.addReply);
router.put('/update/:id', authMiddlewere, replyController.updateReplyByID);
router.delete('/delete/:id', authMiddlewere, replyController.deleteReplyById);

module.exports = router;
