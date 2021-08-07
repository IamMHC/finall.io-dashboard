import { gql } from '@apollo/client';

export const VERIFY_VERFICATION_CODE_QUERY = gql`
  query verifyVerficationCode(
    $id: String!
    $code: String!
    $type: VerficationCodeTypeEnum!
  ) {
    verifyVerficationCode(input: { id: $id, code: $code, type: $type }) {
      message
    }
  }
`;
