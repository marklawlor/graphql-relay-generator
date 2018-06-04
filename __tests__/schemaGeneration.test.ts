import { graphql } from "graphql";

import schema from "./swapi";

describe("schemaGeneration", () => {
  test("query - basic", () => {
    const query = `{
      allFilms {
        films {
          title
          StarshipConnection {
            starships {
              name
            }
          }
        }
      }
    }`;

    return expect(graphql(schema, query)).resolves.toEqual({
      data: {
        allFilms: {
          films: [
            {
              title: "A New Hope",
              StarshipConnection: {
                starships: [
                  {
                    name: "CR90 corvette"
                  },
                  {
                    name: "Star Destroyer"
                  },
                  {
                    name: "Sentinel-class landing craft"
                  },
                  {
                    name: "Death Star"
                  },
                  {
                    name: "Millennium Falcon"
                  },
                  {
                    name: "Y-wing"
                  },
                  {
                    name: "X-wing"
                  },
                  {
                    name: "TIE Advanced x1"
                  }
                ]
              }
            },
            {
              title: "The Empire Strikes Back",
              StarshipConnection: {
                starships: [
                  {
                    name: "Star Destroyer"
                  },
                  {
                    name: "Millennium Falcon"
                  },
                  {
                    name: "Y-wing"
                  },
                  {
                    name: "X-wing"
                  },
                  {
                    name: "Executor"
                  },
                  {
                    name: "Rebel transport"
                  },
                  {
                    name: "Slave 1"
                  },
                  {
                    name: "Imperial shuttle"
                  },
                  {
                    name: "EF76 Nebulon-B escort frigate"
                  }
                ]
              }
            },
            {
              title: "Return of the Jedi",
              StarshipConnection: {
                starships: [
                  {
                    name: "CR90 corvette"
                  },
                  {
                    name: "Star Destroyer"
                  },
                  {
                    name: "Millennium Falcon"
                  },
                  {
                    name: "Y-wing"
                  },
                  {
                    name: "X-wing"
                  },
                  {
                    name: "Executor"
                  },
                  {
                    name: "Rebel transport"
                  },
                  {
                    name: "Imperial shuttle"
                  },
                  {
                    name: "EF76 Nebulon-B escort frigate"
                  },
                  {
                    name: "Calamari Cruiser"
                  },
                  {
                    name: "A-wing"
                  },
                  {
                    name: "B-wing"
                  }
                ]
              }
            },
            {
              title: "The Phantom Menace",
              StarshipConnection: {
                starships: [
                  {
                    name: "Republic Cruiser"
                  },
                  {
                    name: "Droid control ship"
                  },
                  {
                    name: "Naboo fighter"
                  },
                  {
                    name: "Naboo Royal Starship"
                  },
                  {
                    name: "Scimitar"
                  }
                ]
              }
            },
            {
              title: "Attack of the Clones",
              StarshipConnection: {
                starships: [
                  {
                    name: "Slave 1"
                  },
                  {
                    name: "Droid control ship"
                  },
                  {
                    name: "Naboo fighter"
                  },
                  {
                    name: "J-type diplomatic barge"
                  },
                  {
                    name: "AA-9 Coruscant freighter"
                  },
                  {
                    name: "Jedi starfighter"
                  },
                  {
                    name: "H-type Nubian yacht"
                  },
                  {
                    name: "Republic Assault ship"
                  },
                  {
                    name: "Solar Sailer"
                  }
                ]
              }
            },
            {
              title: "Revenge of the Sith",
              StarshipConnection: {
                starships: [
                  {
                    name: "CR90 corvette"
                  },
                  {
                    name: "Droid control ship"
                  },
                  {
                    name: "Jedi starfighter"
                  },
                  {
                    name: "Trade Federation cruiser"
                  },
                  {
                    name: "Theta-class T-2c shuttle"
                  },
                  {
                    name: "Republic attack cruiser"
                  },
                  {
                    name: "Naboo star skiff"
                  },
                  {
                    name: "Jedi Interceptor"
                  },
                  {
                    name: "arc-170"
                  },
                  {
                    name: "Banking clan frigate"
                  },
                  {
                    name: "Belbullab-22 starfighter"
                  },
                  {
                    name: "V-wing"
                  }
                ]
              }
            },
            {
              title: "The Force Awakens",
              StarshipConnection: {
                starships: [
                  {
                    name: "Millennium Falcon"
                  },
                  {
                    name: "T-70 X-wing fighter"
                  }
                ]
              }
            }
          ]
        }
      }
    });
  });
});
