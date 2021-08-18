const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Appointment, Service, PetType, Admin } = require('../models');
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
    },
    //I added a checkout: Please review this
    getCheckout:async(parent,args, context) =>{
      // const url = new URL(context.headers.referer).origin;
      const order = new Order({services: args.services});
      const line_items =[];

      const {services} = await order.populate('services').execPopulate()

      for (let i = 0; i < services.length; i++) {
        const services = await stripe.services.create({
          name: services[i].name,
          description: services[i].description,
          // images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: services[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}../component/canceled`
      });
      return { session: session.id };

     }
    
   
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
    createAppointment: async (parent, args, context) => {
      return await Appointment.create({date: args.date, time: args.time, services: args.services, pet: context.pet});
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
    }
  }
};

module.exports = resolvers;
