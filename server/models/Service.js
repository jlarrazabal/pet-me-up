const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Float,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
