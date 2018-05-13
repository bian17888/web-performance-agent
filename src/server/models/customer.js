/**
 * @file index
 * @author bian17888 2018/2/26 21:40
 */
var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  zip: Number,
  thumbnail: String
});

module.exports = mongoose.model('Customer', customerSchema);

