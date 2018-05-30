import { nodeConnetion, InferType } from "../../../src";

import Starship from "./Starship";

export type StarshipType = InferType<typeof Starship>;

export default nodeConnetion<"starships", StarshipType>({
  name: "FilmStarshipConnection",
  nodeType: Starship,
  prop: "starships"
});
