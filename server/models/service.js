const mongoose = require('mongoose');
const ServiceSchema = require('../schemas/service-schema');

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
