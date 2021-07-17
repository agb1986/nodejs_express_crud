const express = require('express');
const userRouter = require('./src/server/routes/user.route');
const userListRouter = require('./src/server/routes/userList.route');

const app = express();

app.use(userRouter);
app.use(userListRouter);
app.listen(5000);
