import { getNamedType } from "graphql";
import { ConnectionConfigNodeType } from "graphql-relay";

export default (nodeType: ConnectionConfigNodeType, name?: string) => {
  name = name || getNamedType(nodeType).name;

  if (name.endsWith("Connection")) {
    name = name.slice(0, -1 * "Connection".length);
  }

  return name;
};
