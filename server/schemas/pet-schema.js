const CustomerSchema = require('../schemas/customer-schema');
const ServiceSchema = require('../schemas/service-schema');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PetSchema = new Schema({
    owner: {
      type: CustomerSchema,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: false,
    },
    kind: {
      type: String,
      required: true
    },
    breed: {
      type: String, 
      required: false
    },
    gender: { 
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: false
    },
    services: {
      type: [ServiceSchema]
    }
  });

  module.exports = PetSchema;