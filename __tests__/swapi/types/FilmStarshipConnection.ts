import { nodeConnection, InferType } from "../../../src";

import Starship from "./Starship";

export type StarshipType = InferType<typeof Starship>;

export default nodeConnection<StarshipType, "starships">({
  nodeType: Starship,
  prop: "starships"
});
