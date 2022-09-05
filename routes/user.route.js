const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/random', userController.getRandomUser);
router.get('/all', userController.getAllUser);
router.post('/save', userController.saveAnUser);
router.patch('/update', userController.updateUser);
router.patch('/bulk-update', userController.updateMultipleUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;
