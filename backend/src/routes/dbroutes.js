const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); //Exactly this file contains work-operations with DB.
const validateUser = require('../../middleware/validateUser');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users', validateUser, userController.createUser);
router.put('/users/:id', validateUser, userController.updateUser);

module.exports = router;