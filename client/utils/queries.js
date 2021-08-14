import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allUsers {
    profiles {
      _id
      name
      skills
    }
  }
`;
