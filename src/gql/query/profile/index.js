import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query profile {
    profile {
      firstName
      lastName
      username
      email
      role
      themePermission
      isEmailVerified
    }
  }
`;
