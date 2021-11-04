import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCertificate(
      phone: String!,
      isRegister: Boolean!
    ): defaultResult!
  }
`;