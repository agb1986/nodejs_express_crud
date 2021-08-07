const express = require('express');
const userRouter = require('./src/server/routes/user.route');
const userListRouter = require('./src/server/routes/userList.route');
const userCreateRouter = require('./src/server/routes/userCreate.route');

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(userListRouter);
app.use(userCreateRouter);
app.listen(5000);
