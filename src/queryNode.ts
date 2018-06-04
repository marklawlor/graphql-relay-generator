import { GraphQLFieldConfig } from "graphql";

import connectionFactory, { NodeConnectionOptions } from "./nodeConnection";

export default <TProp extends string>(
  config: NodeConnectionOptions<TProp>
): GraphQLFieldConfig<any, any> => connectionFactory(config);
