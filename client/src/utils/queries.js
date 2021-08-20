import { gql } from '@apollo/client';

export const QUERY_GETUSER = gql`
  query getUser {
    getUser {
     firsName
     lastName
     email
     petIDs
    }
  }
`

export const QUERY_GETPETSBYOWNER = gql `
query getPets ($ownerID: ID!) {
  getPets(ownerID: $ownerID) {
    _id
    petName
    birthday
    petType {
      petTypeName
    }
    breed
    gender
    weight
   }
}
`
export const QUERY_GETPETAPP = gql `
query getAllPetAppointments ($petID: ID!) {
  getAllPetAppointments (petID: $petID) {
    date
    services
  }
}`

export const QUERY_GETPET = gql `
query getPet ($petID: ID!) {
  getPet (petID: $petID) {
    _id
    petName
    birthday
    petType {
      petTypeName
    }
    breed
    gender
    weight
    owner {
      _id
      firstName
      lastName
      email
    }
   }
}
`

export const QUERY_GET_SERVICES = gql`
query getServices {
  getServices {
    _id
    name
    price
    description
   }
}
`

export const QUERY_APPOINTMENTS_BY_DATE = gql`
query getAllAppointmentsByDate ($date: String!) {
  getAllAppointmentsByDate (date: $date) {
    _id
    date
    time
   }
}
`

export const QUERY_GETAPPOINTMENTBYID = gql `
query getAppointment ($appointmentID: ID!) {
  getAppointment (appointmentID: $appointmentID) {
    _id
    date
    time
    services {
      _id
      name
      price
    }
    pet {
      _id
      petName
      birthday
      petType {
        _id
        petTypeName
      }
      breed
      gender
      weight
    }
    paymentID
   }
}
`
