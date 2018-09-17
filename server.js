'user strict';

// Dependencies
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App code

const app = express()

// Configure expressInstance
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// URLs
app.get('/hello', (req, res) => {
  res.send({hello: "world"});
});

app.post('/hello', (req, res) => {
  res.send(req.body);
});

app.post('/auth', (req, res) => {
  res.send("Hrere will go the user Auth");
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
