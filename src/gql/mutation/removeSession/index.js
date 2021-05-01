import { gql } from '@apollo/client';

export const REMOVE_SESSION_MUTATION = gql`
  mutation removeSession($accessToken: String!) {
    removeSession(input: { accessToken: $accessToken }) {
      message
    }
  }
`;
