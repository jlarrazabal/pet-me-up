const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Appointment, Service, PetType } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      console.log("User Information", context.user);
      return await User.findById(context.user._id);
    },
    getPet: async (parent, {petID}) => {
      return await Pet.findById(petID);
    },
    getPets: async (parent, {ownerID}) => {
      return await Pet.find({ownerID: ownerID});
    },
    getAppointment: async (parent, {appointmentID}) => {
      return await Appointment.findById(appointmentID);
    },
    getAllPetAppointments: async (parent, {petID}) => {
      return await Appointment.find({petID: petID});
    },
    getServices: async (parent, args) => {
      return await Service.find({});
    },
    getPetTypes: async (parent, args) => {
      return await PetType.find({});
    },
    getAllAppointmentsByDate: async (parent, {date}) => {
      return await Appointment.find({date: date});
    }
  },
  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email});
      if(!user) {
        throw new AuthenticationError("No user found with this email");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if(!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);

      return {token, user};
    },
    addUser: async (parent, {firstName, lastName, email, password}, context) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {token, user};
    },
    addPet: async (parent, args, context) => {
      return await Pet.create({petName: args.petName, birthday: args.birthday, petType: args.petType, breed: args.breed, gender: args.gender, weight: args.weight, ownerID: context.user._id});
    },
    createAppointment: async (parent, args) => {
      return await Appointment.create({date: args.date, time: args.time, services: args.services, petID: args.petID});
    },
    deleteAppointment: async (parent, {appointmentID}) => {
      return await Appointment.deleteOne({_id: appointmentID});
    },
    updateAppointment: async (parent, {appointmentID, paymentID}) => {
      return await Appointment.findbyIdAndUpdate({_id: appointmentID, $set: {paymentID: paymentID}});
    }
  }
};

module.exports = resolvers;
