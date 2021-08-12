const mongoose = require('mongoose');
const PetSchema = require('../schemas/pet-schema');


const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
