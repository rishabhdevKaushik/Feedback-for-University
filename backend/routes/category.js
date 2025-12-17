const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', authMiddlewere, categoryController.getAllCategories);
router.get('/:id', authMiddlewere, categoryController.getCategoryById);
router.get('/name/:name', authMiddlewere, categoryController.getCategoryByName);
router.post('/add', authMiddlewere, categoryController.addCategory);
router.put('/update/:id', authMiddlewere, categoryController.updateCategoryById);
router.delete('/delete/:id', authMiddlewere, categoryController.deleteCategoryById);
router.delete('/deleteAll', authMiddlewere, categoryController.deleteAllCategories);

module.exports = router;
