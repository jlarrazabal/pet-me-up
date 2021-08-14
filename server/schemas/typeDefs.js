const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    petIDs: [String]
  }

  type Pet {
    _id: ID!
    petName: String!
    birthday: String!
    petType: PetType!
    breed: String!
    gender: String!
    weight: Float!
    ownerID: String!
  }

  type Service {
    _id: ID!
    name: String!
    price: Float!
    description: String!
  }

  type Appointment {
    _id: ID!
    date: String!
    time: Int!
    services: [Service]!
    petID: String!
    paymentID: String
  }

  type PetType {
    _id: ID!
    petTypeName: String!
  }

  type Auth {
    token: ID
    user: User
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
    petName: String!
    birthday: Int!
    petType: PetType!
    breed: String!
    gender: String!
    weight: Float!
  }

  input AppointmentInput {
    date: String!
    time: Int!
    services: [Service]!
    petID: String!
  }

  type Query {
    getUser: User
    getPet(petID: ID!): Pet
    getPets(ownerID: ID!): [Pet]
    getAppointment(appointmentID: ID!): Appointment
    getAllPetAppointments(petID: ID!):[Appointment]
    getServices: [Service]
    getPetTypes: [PetType]
  }

  type Mutation {
    addUser(input: RegisterUserInput): Auth
    loginUser(input: LoginInput): Auth
    addPet(input: RegisterPetInput): Pet
    createAppointment(input: AppointmentInput): Appointment
    deleteAppointment(appointmentID: ID!): Appointment
    updateAppointment(appointmentID: ID!, paymentID: String!): Appointment
  }
`;

module.exports = typeDefs;
