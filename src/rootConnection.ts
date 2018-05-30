import { GraphQLFieldConfig } from "graphql";

import connectionFactory, { ConnectionFactoryOptions } from "./nodeConnection";

const rootConnection = <TProp extends string>(
  config: ConnectionFactoryOptions<TProp>
): GraphQLFieldConfig<any, any> => {
  return connectionFactory(config);
};

export default rootConnection;
