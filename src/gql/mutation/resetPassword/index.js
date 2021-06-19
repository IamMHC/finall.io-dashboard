import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $id: String!
    $code: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      input: {
        id: $id
        code: $code
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      message
    }
  }
`;
