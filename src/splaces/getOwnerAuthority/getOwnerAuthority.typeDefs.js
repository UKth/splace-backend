import { gql } from "apollo-server";

export default gql`
  type Mutation {
    getOwnerAuthority (
      birthDay: String!
      splaceId: Int!
      corpNum: String!
      name: String!
      imageUrls: [String]
    ): defaultResult!
  }
`;