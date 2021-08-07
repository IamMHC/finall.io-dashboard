import { gql } from '@apollo/client';

export const VERIFY_EMAIL_ADDRESS = gql`
  mutation verifyEmailAddress(
    $id: String!
    $code: String!
    $type: VerficationCodeTypeEnum!
  ) {
    verifyEmailAddress(input: { id: $id, code: $code, type: $type }) {
      message
    }
  }
`;
