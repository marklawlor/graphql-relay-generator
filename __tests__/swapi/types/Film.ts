import { GraphQLString } from "graphql";

import { nodeFactory, InferType } from "../../../src";

import StarshipConnection from "./FilmStarshipConnection";

interface Fields {
  title: string;
}

interface Connections {
  StarshipConnection: InferType<typeof StarshipConnection>;
}

const Film = nodeFactory<Fields, Connections>({
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
