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

app.post('/hello', (req, res) => {
  res.send("Sending post with username");
});

app.post('/auth', (req, res) => {
  res.send("Hrere will go the user Auth");
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
