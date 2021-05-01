import { gql } from '@apollo/client';

export const USERNAME_AVAILABLE_QUERY = gql`
  query usernameAvailable($username: String!) {
    usernameAvailable(username: $username) {
      message
    }
  }
`;
