const mongoose = require('mongoose');

const { Schema } = mongoose;
const PetModel = require('./Pet');
const ServiceModel = new require('./Service');


const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  services: [ServiceModel.schema],
  pet: {
    type: PetModel.schema,
  },
  paymentID: {
    type: String,
    required: false,
    default: null
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
