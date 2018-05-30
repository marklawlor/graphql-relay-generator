import { GraphQLNonNull, GraphQLInt } from "graphql";
import { mutation } from "../../../src";

import Film from "../types/Film";

interface Input {
  number: number;
}

interface Output {
  number: number;
}

export default mutation<Input, Output>({
  name: "addOne",
  inputFields: () => ({
    number: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }),
  outputFields: () => ({
    number: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }),
  resolver: args => {
    return {
      number: args.number + 1
    };
  }
});
