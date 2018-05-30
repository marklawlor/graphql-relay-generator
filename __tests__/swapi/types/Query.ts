import { GraphQLObjectType } from "graphql";

import * as queries from "../queries";

export default new GraphQLObjectType({
  fields: () => queries,
  name: "Query"
});
