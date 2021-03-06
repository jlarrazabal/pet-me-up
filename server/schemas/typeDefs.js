const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    pets: [Pet]!
    password: String!
  }

  type Pet {
    _id: ID!
    petName: String!
    birthday: String!
    petType: PetType!
    breed: String!
    gender: String!
    weight: Float!
    owner: ID!
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
    pet: Pet!
    paymentID: String
  }

  type PetType {
    _id: ID!
    petTypeName: String!
  }

  type AuthUser {
    token: ID
    user: User
  }

  type AuthAdmin {
    token: ID
    admin: Admin
  }

  type Admin {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input RegisterPetInput {
    petName: String!
    birthday: String!
    petType: AppointmentPetTypeInput!
    breed: String!
    gender: String!
    weight: Float!
    owner: ID!
  }

  input AppointmentServiceInput {
    _id: ID!
    name: String!
    price: Int!
    description: String!
  }

  input AppointmentPetTypeInput {
    _id: ID!
    petTypeName: String!
  }

  input AppointmentOwnerInput {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input AppointmentPetInput {
    _id: ID!
    petName: String!
    birthday: String!
    petType: AppointmentPetTypeInput
    breed: String!
    gender: String!
    weight: Float!
    owner: ID!
  }

  input AppointmentInput {
    date: String!
    time: Int!
    services: [AppointmentServiceInput]!
    pet: AppointmentPetInput!
  }

  input ServiceInput {
    name: String!
    price: Int!
    description: String!
  }

  type Query {
    getUser: User
    getAdmin: Admin
    getPet(petID: ID!): Pet
    getPets(ownerID: ID!): [Pet]
    getAppointment(appointmentID: ID!): Appointment
    getAllPetAppointments(petID: ID!):[Appointment]
    getServices: [Service]
    getPetTypes: [PetType]
    getAllAppointmentsByDate(date: String!): [Appointment]
  }

  type Mutation {
    addUser(input: RegisterUserInput): User
    loginUser(input: LoginInput): AuthUser
    loginAdmin(input: LoginInput): AuthAdmin
    addPet(input: RegisterPetInput): Pet
    createAppointment(input: AppointmentInput): Appointment
    deleteAppointment(appointmentID: ID!): Appointment
    updateAppointment(appointmentID: ID!, paymentID: String!): Appointment
    createService (input: ServiceInput): Service
    deleteService(serviceID: ID!): Service
    checkOut(appointmentID: ID!): String!
    deletePet(petID: ID!): Pet
  }
`;

module.exports = typeDefs;
