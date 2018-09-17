'user strict';

// Dependencies
const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App code

const app = express()

// URLs
app.get('/hello', (req, res) => {
  res.send({hello: "world"});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
