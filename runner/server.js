const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.json({name: 'user test'});
})

app.listen(3000);