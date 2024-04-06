/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Path = require('path');
const router = require('./router');

const app = express();
module.exports.app = app;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(Path.join(__dirname, '../dist')));

app.use('/skoolhub', router);

app.get(`/${process.env.LOADERIO_IO_TOKEN}`, (req, res) => {
  res.type('txt').send(`${process.env.LOADERIO_IO_TOKEN}`);
});

// app.get('*', (req, res) => {
//   res.sendFile(Path.resolve(__dirname, '../dist/index.html'));
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
