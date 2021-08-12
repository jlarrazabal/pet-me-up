const PetSchema = require('../schemas/pet-schema');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const CustomerSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pets: {
      type: [PetSchema]
    }
  });

  module.exports = CustomerSchema;