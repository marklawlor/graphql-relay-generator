import { GraphQLString } from "graphql";

import { nodeFactory } from "../../../src";

interface Fields {
  name: string;
}

interface Connections {}

export default nodeFactory<Fields, Connections>({
  name: "Starship",
  fields: {
    name: {
      type: GraphQLString
    }
  }
});
