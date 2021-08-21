const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Appointment, Service, PetType, Admin } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51J4w5gDOaNKFFbdCi9dREMYKBip7M2gSfCQXLKqrR8nDJgzZivzhRxXoR3irDITDTAaFwsXkbnP2AW53tDfvjETJ00BwwqY8hk');

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
      return await Pet.find({ownerID: ownerID}).populate("owner");
    },
    getAppointment: async (parent, {appointmentID}) => {
      return await Appointment.findById(appointmentID);
    },
    getAllPetAppointments: async (parent, {petID}) => {
      return await Appointment.find({petID: petID});
    },
    getServices: async (parent, args) => {
      console.log("Query Services");
      const services = await Service.find({});
      console.log(services);
      return services;
    },
    getPetTypes: async (parent, args) => {
      return await PetType.find({});
    },
    getAllAppointmentsByDate: async (parent, {date}) => {
      return await Appointment.find({date: { $gte: `${date} 00:00:00`, $lte: `${date} 23:59:59` }});
    },
    getAdmin: async (parent, args, context) => {
      console.log("User Information", context.admin);
      return await User.findById(context.admin._id);
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
      return await Pet.create({petName: args.petName, birthday: args.birthday, petType: args.petType, breed: args.breed, gender: args.gender, weight: args.weight, owner: context.user});
    },
    createAppointment: async (parent, {input: {date, time, services, pet}}) => {
      return await Appointment.create({date, time, services, pet});
    },
    deleteAppointment: async (parent, {appointmentID}) => {
      return await Appointment.deleteOne({_id: appointmentID});
    },
    updateAppointment: async (parent, {appointmentID, paymentID}) => {
      return await Appointment.findbyIdAndUpdate({_id: appointmentID, $set: {paymentID: paymentID}});
    },
    createService: async (parent, args) => {
      return await Service.create({name: args.name, price: args.price, description: args.description});
    },
    deleteService: async (parent, args) => {
      return await Service.deleteOne({_id: args.serviceID});
    },
    loginAdmin: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email: email});
      if(!admin) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if(!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(admin);

      return {token, admin};
    },
    checkOut: async (parent, {appointmentID}) => {
      const appointment = await Appointment.findById(appointmentID);
      const prices = [];
      for(let i=0; i < appointment.services.length; i++) {
        const price = await stripe.prices.create({
            unit_amount: parseInt(appointment.services[i].price)*100,
            currency: 'usd',
            product_data: {
                name:appointment.services[i].name
            },
          });
      prices.push({price: price.id, quantity:1});
      }

      const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:3000/checkout/${appointmentID}`,
      cancel_url: `http://localhost:3000/appointment-summary/${appointmentID}`,
      payment_method_types: ['card'],
      line_items: prices,
      mode: 'payment',
      });
      await Appointment.findOneAndUpdate({_id: appointmentID}, {$set: {paymentID: session.id}});
      return session.url;
    }
  }
};

module.exports = resolvers;
