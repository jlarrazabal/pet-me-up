const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');
const Appointment require('./Appointment');
const PetType require('./PetType');

const petSchema = new Schema({
  petName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  petType: PetType,
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
  ownerID: {
    type: Schema.Types.ObjectId,
      ref: 'User'
    },
  appointmentIDs: [{
    type: Schema.Types.ObjectId,
      ref: 'Appointment'
    }]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
