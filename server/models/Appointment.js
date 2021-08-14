const mongoose = require('mongoose');

const { Schema } = mongoose;
const Appointment = require('./Appointment');
const Pet = require('./Pet');
const Service = require('./Service');

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  services: [Service],
  petID: {
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  },
  paymentID: {
    type: String,
    required: false,
    default: null
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
