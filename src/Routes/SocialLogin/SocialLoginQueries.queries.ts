import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstName: String!
    $lastName: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;

export const GOOGLE_CONNECT = gql`
  mutation googleConnect(
    $firstName: String!
    $lastName: String!
    $ggId: String!
    $email: String
    $profilePhoto: String!
  ) {
    GoogleConnect(
      firstName: $firstName
      lastName: $lastName
      ggId: $ggId
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
      token
    }
  }
`;
