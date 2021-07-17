const express = require('express');
const userListController = require('../controllers/userList.controller');

const userListRouter = express.Router();

userListRouter.get('/api/userList', userListController.getUserList);

module.exports = userListRouter;
