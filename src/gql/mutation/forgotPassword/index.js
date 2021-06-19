import { gql } from '@apollo/client';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($username: String!) {
    forgotPassword(input: { username: $username }) {
      message
    }
  }
`;
