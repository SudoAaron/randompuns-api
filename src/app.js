const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const punRouter = require('./routers/pun');
const userRouter = require('./routers/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(punRouter);
app.use(userRouter);

module.exports = app;