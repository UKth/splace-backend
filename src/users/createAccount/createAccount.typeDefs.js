import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      password: String!
      phone: String!
      token: String!
      marketingAgree: Boolean!
    ): defaultResult!
  }
`;