import { GraphQLList, GraphQLObjectType } from "graphql";
import { ConnectionConfigNodeType, connectionDefinitions } from "graphql-relay";

export interface ConnectionTypeConfig {
  name: string;
  prop: string;
  nodeType: ConnectionConfigNodeType;
}

export default ({
  name,
  prop,
  nodeType
}: ConnectionTypeConfig): GraphQLObjectType => {
  const { connectionType } = connectionDefinitions({
    connectionFields: () => {
      if (!prop) {
        return {};
      }

      return {
        [prop]: {
          resolve: conn => conn.edges.map((edge: { node: any }) => edge.node),
          type: new GraphQLList(nodeType)
        }
      };
    },
    name,
    nodeType: nodeType as any
  });

  return connectionType;
};
