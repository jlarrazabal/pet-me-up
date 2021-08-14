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
`;

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

