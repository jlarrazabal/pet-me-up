const PetSchema = require('./pet-schema');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
    pets: {
      type: [PetSchema]
    }
  });

  module.exports = UserSchema;