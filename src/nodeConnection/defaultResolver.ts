import { GraphQLFieldResolver } from "graphql";

const defaultResolver = (
  alias: string
): GraphQLFieldResolver<any, any> => source => {
  if (source) {
    return source[alias];
  }
};

export default defaultResolver;
