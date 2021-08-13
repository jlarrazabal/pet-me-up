const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');
const Appointment require('./Appointment');

const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: Integer,
    required: true
  },
  pet: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Float,
    required: true
  },
  owner: User,
  appointments: [Appointment]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
