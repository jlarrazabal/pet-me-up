const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    pets: [Pet]
  }

  type Pet {
    _id: ID!
    name: String!
    birthday: Int!
    pet: String!
    breed: String!
    gender: String!
    weight: Float!
    owner: User
    appointments: [Appointment]
  }

  type Service {
    _id: ID!
    name: String!
    price: Float!
    description: String!
  }

  type Appointment {
    _id: ID!
    date: Int!
    time: Int!
    services: [Service]
    pet: Pet
    paymentID: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getUser: User
    getPet(petID: ID!): Pet
    getAppointment(appointmentID: ID!): Appointment
    getAllPetAppointments(petID: ID!):[Appointment]
    getServices: [Service]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input RegisterPetInput {
    name: String!
    birthday: Int!
    pet: String!
    breed: String!
    gender: String!
    weight: Float!
  }

  input AppointmentInput {
    date: Int!
    time: Int!
    services: [Service]!
    petID: ID!
  }

  type Mutation {
    addUser(input: RegisterUserInput): Auth
    loginUser(input: LoginInput): Auth
    addPet(input: RegisterPetInput): User
    createAppointment(input: AppointmentInput): Pet
    deleteAppointment(appointmentID: ID!): Pet
    updateAppointment(appointmentID: ID!): Pet
  }
`;

module.exports = typeDefs;
