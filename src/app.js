const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const punRouter = require('./routers/pun');

const app = express();

app.use(cors());
app.use(express.json());
app.use(punRouter);

module.exports = app;