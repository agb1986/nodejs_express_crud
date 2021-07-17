const express = require('express');
const userRouter = require('./src/server/routes/user.route');

const app = express();

app.use(userRouter);
app.listen(5000);
