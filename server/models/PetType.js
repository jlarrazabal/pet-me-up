const mongoose = require('mongoose');

const { Schema } = mongoose;

const petTypeSchema = new Schema({
  petTypeName: {
    type: String,
    required: true,
  }
});

const PetType = mongoose.model('PetType', petTypeSchema);

module.exports = PetType;
