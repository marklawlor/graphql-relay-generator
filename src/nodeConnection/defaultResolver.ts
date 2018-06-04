import { GraphQLFieldResolver } from "graphql";

import { connectionFromArray } from "graphql-relay";

const defaultResolver = (alias: string): GraphQLFieldResolver<any, any> => (
  source,
  args
) => {
  if (source && source[alias]) {
    return connectionFromArray(source[alias], args);
  }
};

export default defaultResolver;
