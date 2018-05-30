import { GraphQLObjectType } from "graphql";

import * as mutations from "../mutations";

export default new GraphQLObjectType({
  fields: () => mutations,
  name: "Mutation"
});
