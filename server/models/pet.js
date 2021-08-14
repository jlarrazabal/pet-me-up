const mongoose = require('mongoose');

const { Schema } = mongoose;
const userModel = require('./User');
const petType = require('./PetType');



const petSchema = new Schema({
  petName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  petType: {
    type: petType.schema,
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
    type: Number,
    required: true
  },
  owner: {type: userModel.schema, required: true}
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
