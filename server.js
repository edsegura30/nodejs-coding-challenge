'user strict';

// Dependencies
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./auth/User')
var checkToken = require('./auth/CheckToken')
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
      return res.status(201).send({created: true});
    });
  }
});

app.post('/auth', (req, res) => {
  var username = req.body.user;
  var password = req.body.password;
  User.findOne(
    {user: username},
    function(error, userFound){
      if (error) return res.status(500).send('Something went wrong. Please try again');
      if (!userFound) return res.status(404).send('Wrong username and/or password');

      var isPasswordValid = bcrypt.compareSync(password, userFound.password);
      if (!isPasswordValid) return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: userFound._id }, config.secret, {
        expiresIn: 86400
      });
    res.status(200).send({ auth: true, token: token });
    }
  );
});

app.get('/check', checkToken, function(req, res){
  User.findById(req.userId, {password: 0}, function(err, userFound){
    if (err) return res.status(400).send('Credentials were incorrect');
    if (!userFound) return res.status(404).send('User not found');

    return res.status(200).send(userFound)
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
