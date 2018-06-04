import {
  GraphQLFieldConfigMap,
  GraphQLObjectType,
  GraphQLObjectTypeConfig
} from "graphql";

import { TypedFieldConfig, OutputFieldConfigMap, Typed } from "./types";

export interface NodeConfig<TFields, TConnections, TSource, TContext>
  extends GraphQLObjectTypeConfig<TSource, TContext> {
  fields: OutputFieldConfigMap<TFields, TSource, TContext>;
  connections?: () => TypedFieldConfig<TConnections>;
}

const defaultConfig = {
  connections: () => ({})
};

const node = <TFields, TConnections = {}, TSource = any, TContext = any>(
  config: NodeConfig<TFields, TConnections, TSource, TContext>
): GraphQLObjectType & Typed<TFields & TConnections> => {
  let { connections, ...typeConfig } = { ...defaultConfig, ...config };

  const objectFields = config.fields as GraphQLFieldConfigMap<
    TSource,
    TContext
  >;

  const connectionFields = connections() as GraphQLFieldConfigMap<
    TFields,
    TContext
  >;

  return new GraphQLObjectType({
    ...typeConfig,
    fields: () => ({
      ...objectFields,
      ...connectionFields
    })
  });
};
export default node;
