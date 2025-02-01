require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connection established successfully"));

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const playersRouter = require('./routes/players');
app.use('/players', playersRouter);

app.listen(3000);

