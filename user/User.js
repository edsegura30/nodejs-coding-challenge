var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  user: String,
  password: String
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
