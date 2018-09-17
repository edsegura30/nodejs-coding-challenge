var mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017');
var UserSchema = new mongoose.Schema({
  user: String,
  password: String
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
