const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/api/user', userController.getUser);
userRouter.put('/api/user', userController.putUser);
userRouter.delete('/api/user', userController.deleteUser);

module.exports = userRouter;
