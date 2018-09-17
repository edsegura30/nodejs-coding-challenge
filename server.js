'user strict';

// Dependencies
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./user/User')
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

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
app.get('/', (req, res) => {
  res.send("Index");
});

app.get('/hello', (req, res) => {
  res.send({
    hello: "world"
  });
});

app.post('/hello', (req, res) => {
  var username = req.body.user;
  var password = req.body.password;
  var confPassword = req.body.confPassword;
  console.log("New user POST");
  if (password !== confPassword) {
    res.status(400);
    res.send({
      error: "Passwords must match"
    });
  } else if(
    username.length === 0 || password.length === 0){
      res.status(400);
      res.send({
        error: "Incomplete info"
      });
  } else if(password.length < 8){
    res.status(400);
    res.send({
      error: "Password must be 8 characters long at least"
    });
  }
  else {
    var hashedPassword = bcrypt.hashSync(password, 8);

    User.create({
      user: username,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")

      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      return res.status(201).send({ auth: true, token: token });
    });
  }
});

app.post('/auth', (req, res) => {
  res.send("Hrere will go the user Auth");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
