import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLInt } from "graphql";

import {
  connectionArgs,
  ConnectionConfig,
  connectionFromArray,
  offsetToCursor
} from "graphql-relay";

import { HasConnection, Typed } from "../types";

import defaultResolver from "./defaultResolver";
import resolveName from "./resolveName";
import getConnectionType from "./connectionType";

export interface ConnectionFactoryOptions<TProp extends string>
  extends ConnectionConfig {
  name?: string;
  prop: TProp;
  resolver?: GraphQLFieldResolver<any, any>;
}

const connectionFactory = <TProp extends string, TFields>(
  config: ConnectionFactoryOptions<TProp>
): Typed<HasConnection<TProp, TFields>> & GraphQLFieldConfig<any, any> => {
  let { name, nodeType, prop, resolver } = config;

  name = resolveName(nodeType, name);

  const connectionResolver = resolver || defaultResolver(prop);

  const connectionType = getConnectionType({ prop, nodeType });

  return {
    args: {
      ...(connectionArgs as any),
      limit: {
        type: GraphQLInt
      },
      offset: {
        type: GraphQLInt
      }
    },
    resolve: async (source, args, context, info) => {
      if (args.offset) {
        args.after = offsetToCursor(args.offset);
      }

      if (args.limit) {
        args.first = args.limit;
      }

      const array = await connectionResolver(source, args, context, info);

      return {
        ...connectionFromArray(array, args),
        totalCount: array.length
      };
    },
    type: connectionType as any
  };
};

export default connectionFactory;
