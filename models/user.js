var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
  name: String,
  email: String,
  password: String,
  door_number: String
  
});

module.exports = User;