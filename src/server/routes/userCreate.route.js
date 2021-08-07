const express = require('express');
const userCreateController = require('../controllers/userCreate.controller');

const userCreateRouter = express.Router();

userCreateRouter.post('/api/userCreate', userCreateController.postUser);

module.exports = userCreateRouter;
