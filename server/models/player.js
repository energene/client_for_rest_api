const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  team: String
});

module.exports = exports = mongoose.model('Player', playerSchema);
