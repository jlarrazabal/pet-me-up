const mongoose = require('mongoose');

const { Schema } = mongoose;
const Appointment require('./Appointment');
const Pet require('./Pet');
const Service require('./Service');

const appointmentSchema = new Schema({
  date: {
    type: Integer,
    required: true,
  },
  time: {
    type: Integer,
    required: true,
  },
  services: [Service],
  pet: Pet,
  paymentID: {
    type: String,
    required: false,
    default: null
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
