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
    petType
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
    petType
    breed
    gender
    weight
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
query getAppointment ($getAppointment: ID!) {
  getAppointment (getAppointment: $appointmentID) {
    _id
    date
    time
    services
    petID
    paymentID
}
`

export const QUERY_GETCHECKOUT_ID = gql `
query getCheckout ($getCheckout: ID!) {
  getCheckout (getCheckout: $checkoutID) {
    _id
    date
    time
    services
    petID
    checkoutID(service:[ID]!): checkout
}
`
