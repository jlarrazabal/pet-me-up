const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomerSchema = require('../schemas/customer-schema');

// set up pre-save middleware to create password
CustomerSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
CustomerSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
