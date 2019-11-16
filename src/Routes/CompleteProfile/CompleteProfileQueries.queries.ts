import { gql } from "apollo-boost";

export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $profilePhoto: String!
    $phoneNumber: String!
  ) {
    EmailSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      profilePhoto: $profilePhoto
      phoneNumber: $phoneNumber
    ) {
      ok
      error
      token
    }
  }
`;
