require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Path = require('path');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(Path.join(__dirname, '../dist')));
app.use('/products', router);
app.get(`/${process.env.LOADERIO_IO_TOKEN}`, (req, res) => {
  res.type('txt').send(`${process.env.LOADERIO_IO_TOKEN}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
