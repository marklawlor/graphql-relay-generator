# graphql-relay-schema-builder

A set of helper functions to build a type-safe GraphQL Schema

Inspired by the helper functions used in [GraphQL SWAPI](https://github.com/graphql/swapi-graphql)

## Strict typing with TypeScript

graphql-relay-schema-builder provides strict typing of all GraphQL objects and can infer runtime interfaces **without** a compile step

```
interface FilmFields {
  title: string;
}

interface FilmConnections {
  StarshipConnection: InferType<typeof StarshipConnection>;
}

interface StarshipFields {
	name: string;
}

const GraphQLFilmObject = nodeFactory<FilmFields, FilmConnections>({
  name: "Film",
  fields: {
    title: {
      type: GraphQLString
    }
  },
  connections: () => ({
    StarshipConnection: GraphQLFilmStarshipConnectionObject
  })
});

const GraphQLFilmStarshipConnectionObject = nodeConnetion<"starships", StarshipFields>({
  name: "FilmStarshipConnection",
  nodeType: Starship,
  prop: "starships"
});

// To get an interface of Film that includes the starship connect, you just need to infer it

type Film = InferType<typeof GraphQLFilmObject> // No compile step needed!

// The type Film === interface Film

interface Film {
	title: string
	StarshipConnection: {
		totalCount: number
		edges: {
			node: { // node: StarshipFields
				name: string
			}
		}
		starships: [{ // starships: StarshipFields[] 
			name: string
		}]
	}
}
```


