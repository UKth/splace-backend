import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSeriesOrder(photologIds: [Int]!, seriesId: Int!): defaultResult!
  }
`;