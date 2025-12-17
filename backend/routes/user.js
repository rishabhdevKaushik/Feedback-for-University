const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', authMiddlewere, userController.getAllUsers);
router.get('/:id', authMiddlewere, userController.getOneUserById);
router.get('/username/:username', authMiddlewere, userController.getOneUserByUsername);
router.get('/email/:email', authMiddlewere, userController.getOneUserByEmail);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update/:id', authMiddlewere, userController.updateUserById);
router.delete('/delete/:id', authMiddlewere, userController.deleteUserById);

module.exports = router;
