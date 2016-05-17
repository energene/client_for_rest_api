const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    validate: {
      validator: function(value) {
        if (value >= 18 && value <= 50) return true;
        return false;
      },
      message: '{VALUE} is not a valid age!'
    }
  },
  position: String,
  height: Number,
  weight: Number
});

module.exports = exports = mongoose.model('Player', playerSchema);
