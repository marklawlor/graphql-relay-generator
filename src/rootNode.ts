import { GraphQLNonNull, GraphQLID, GraphQLFieldConfig } from "graphql";

export default function({
  nodeType,
  resolver
}: any): GraphQLFieldConfig<any, any> {
  return {
    type: nodeType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: resolver
  };
}
