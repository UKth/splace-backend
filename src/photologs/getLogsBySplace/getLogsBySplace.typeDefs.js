import { gql } from "apollo-server";

export default gql`
  type getLogsBySplaceResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsBySplace(splaceId: Int!, lastId: Int): getLogsBySplaceResult!
  }
`;