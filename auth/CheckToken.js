var jwt = require('jsonwebtoken');
var config = require('../config');

function checkToken(req, res, next) {
  /*
  This will helps us as a MiddleWare function to check if the
  client has the permissions to be in there
  */
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No credentials provided' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Something wrong happened resolving the credentials' });

    /// Save the id of the user we obtained to use it in another steps
    req.userId = decoded.id;
    next();
  });
}

module.exports = checkToken;
