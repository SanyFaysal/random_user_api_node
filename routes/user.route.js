const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/random', userController.getRandomUser);
router.get('/all', userController.getAllUser);
router.post('/save', userController.saveAnUser);

module.exports = router;
