const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
  height: Number,
  weight: Number
});

module.exports = exports = mongoose.model('Player', playerSchema);
