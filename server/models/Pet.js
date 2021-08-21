const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserModel = require('./User');
const PetTypeModel = require('./PetType');

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
    type: PetTypeModel.schema,
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
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
