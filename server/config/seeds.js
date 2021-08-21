const mongoose = require('mongoose');
const db = require('./connection');
const { Pet, PetType, Service, Appointment, User } = require('../models');
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'doe@test.com',
  password: 'test12345'
}

const servicesData = [
  {
    name: 'Shot',
    description: 'Rabis',
    price: 10
  },
  {
    name: 'Visit',
    description: 'Regular visit',
    price: 20
  },  
  {
    name: 'Emergency',
    description: 'Emergency visit',
    price: 30
  },
]

const petTypes = [
  {
    petTypeName: 'Dog'
  },
  {
    petTypeName: 'Cat'
  },
  {
    petTypeName: 'Fish'
  },
  {
    petTypeName: 'Turtle'
  }

]
const pets = [
  {
    petName: 'Daiquiri',
    birthday: new Date(new Date().setDate(new Date().getDate() - 2)),
    petType: petTypes[0],
    breed: 'Frech bulldog',
    gender: 'male',
    weight: '30',
  }
]

const appointments = [
  {
    pet: pets[0],
    date: new Date(new Date().setDate(new Date().getDate() - 9)),
    time: 0,
    services: servicesData[1]
  }
]


db.once('open', async () => {
  await User.deleteMany({});
  await PetType.deleteMany({});
  await Service.deleteMany({});
  await Appointment.deleteMany({});
  await Pet.deleteMany();

  await User.insertMany(user);
  //Get user id 
  const testUser = await User.findOne({firstName: 'John'});
  pets.map(item => item.owner = testUser.id);
  await PetType.insertMany(petTypes);
  await Service.insertMany(servicesData);
  await Appointment.insertMany(appointments);
  await Pet.insertMany(pets);

  console.log('users seeded');

  process.exit();
});
