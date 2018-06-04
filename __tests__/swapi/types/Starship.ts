import { GraphQLString } from "graphql";

import { node } from "../../../src";

interface Fields {
  name: string;
}

interface Connections {}

export default node<Fields, Connections>({
  name: "Starship",
  fields: {
    name: {
      type: GraphQLString
    }
  }
});
