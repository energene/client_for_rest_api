const mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  name: String,
  city: String,
  mascot: String
});

module.exports = exports = mongoose.model('Team', teamSchema);
