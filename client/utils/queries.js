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

export const QUERY_GETPETS = gql `
query getPets {
  getPets(ownerID: ID!) {
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
