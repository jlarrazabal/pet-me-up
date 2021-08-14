const mongoose = require('mongoose');

const { Schema } = mongoose;
const pet = require('./Pet');
const serviceModel = new require('./Service');

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  services: [serviceModel.schema],
  pet: {
    type: pet.schema,
  },
  paymentID: {
    type: String,
    required: false,
    default: null
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
