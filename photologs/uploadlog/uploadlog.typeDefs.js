import { gql } from "apollo-server";

export default gql`
  type uploadLogResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    uploadLog(
      title: String!
      imageUrls: [String]
      photoSize: Int!
      text: String
      splaceId: Int
      seriesId: Int
      hashtags: [String]
    ): uploadLogResult!
  }
`;