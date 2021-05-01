import { gql } from '@apollo/client';

export const SINGUP_MUTATION = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      input: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      }
    ) {
      accessToken
      refreshToken
    }
  }
`;
