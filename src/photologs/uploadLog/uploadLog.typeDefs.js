import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadLog(
      imageUrls: [String]!
      photoSize: Int!
      text: String
      splaceId: Int
      seriesIds: [Int]!
      categories: [String]!
      bigCategoryIds: [Int]!
      isPrivate: Boolean!
      splaceThumbnail: String
    ): defaultResult!
  }
`;