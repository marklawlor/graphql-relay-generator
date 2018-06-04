import { GraphQLString } from "graphql";

import { node, InferType } from "../../../src";

import StarshipConnection from "./FilmStarshipConnection";

interface Fields {
  title: string;
}

interface Connections {
  StarshipConnection: InferType<typeof StarshipConnection>;
}

export default node<Fields, Connections>({
  name: "Film",
  fields: {
    title: {
      type: GraphQLString
    }
  },
  connections: () => ({
    StarshipConnection: StarshipConnection
  })
});
