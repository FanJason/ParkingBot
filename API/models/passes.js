const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  users: {
    type: Array
  }
});

const Pass = mongoose.model('Pass', passSchema);
module.exports = Pass;