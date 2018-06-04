import { GraphQLFieldConfig, GraphQLFieldResolver } from "graphql";

import { connectionArgs, ConnectionConfig } from "graphql-relay";

import { HasConnection, Typed } from "../types";

import defaultResolver from "./defaultResolver";
import resolveName from "./resolveName";
import getConnectionType from "./connectionType";

export interface NodeConnectionOptions<TProp extends string | void>
  extends ConnectionConfig {
  name?: string;
  prop?: TProp;
  resolver?: GraphQLFieldResolver<any, any>;
}

function NodeConnection<TFields>(
  config: NodeConnectionOptions<void>
): Typed<HasConnection<TFields, void>> & GraphQLFieldConfig<any, any>;
function NodeConnection<TFields, TEdgeProp extends string>(
  config: NodeConnectionOptions<TEdgeProp>
): Typed<HasConnection<TFields, TEdgeProp>> & GraphQLFieldConfig<any, any>;
function NodeConnection(config: any) {
  let { name, nodeType, prop, resolver } = config;

  name = resolveName(nodeType, name);

  const resolve = resolver || defaultResolver(prop);

  const connectionType = getConnectionType({ name, prop, nodeType });

  return {
    args: connectionArgs,
    resolve,
    type: connectionType as any
  };
}

export default NodeConnection;
