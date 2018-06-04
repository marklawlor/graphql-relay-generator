# graphql-relay-schema-builder

A set of helper functions to build a type-safe GraphQL Schema

Inspired by the helper functions used in [GraphQL SWAPI](https://github.com/graphql/swapi-graphql)

## Usage

### Creating nodes 

Almost all your types will be Nodes. The `node` factory function wraps GraphQLObjectType and provides a new option for connections.

```
node<TFields, TConnections>(config: NodeConfig) => Node

type NodeConfig = {
  name: string;
  interfaces?: GraphQLInterfacesThunk | Array<GraphQLInterfaceType>;
  fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap;
  isTypeOf?: (value: any, info?: GraphQLResolveInfo) => boolean;
  description?: ?string
  connections?: () => GraphQLFieldConfig
}

```

Nodes === GraphQLObjectTypes, just with a little bit of extra Typescript goodness


### Creating connections

Connections connect your nodes to their edges

```
nodeConnection<TFields, TEdgeProp = void>(config: NodeConfig) => GraphQLObjectType

type NodeConfig = {
  name?: string | null;
  nodeType: Node;
  resolveNode?: GraphQLFieldResolver<any, any> | null;
  resolveCursor?: GraphQLFieldResolver<any, any> | null;
  edgeFields?: Thunk<GraphQLFieldConfigMap<any, any>> | null;
  connectionFields?: Thunk<GraphQLFieldConfigMap<any, any>> | null;
  prop?: string
}

//Example
const FilmStarshipConnection = nodeConnection<StarshipType, "starships">({
  name: "FilmStarshipConnection",
  nodeType: Starship,
  prop: "starships",
  resolver: () => { // add logic }
});

```

The additional `prop` option creates an edge field that is an array of node edge nodes


### Querying connections

// TODO

### Querying Node by id

// TODO

## Strict typing with TypeScript

graphql-relay-schema-builder provides strict typing of all GraphQL objects and can infer Typescript interfaces **without** a compile step

This allows you to build dynamic interfaces to use within resolvers, mutations and even in your frontend code

```
interface FilmFields {
  title: string;
  episodeID: number
  releaseDate: string
}

interface FilmConnections {
  StarshipConnection: InferType<typeof StarshipConnection>;
}

interface StarshipFields {
	name: string;
  starshipClass: string
}

const GraphQLFilmObject = node<FilmFields, FilmConnections>({
  name: "Film",
  fields: {
    title: {
      type: GraphQLString
    },
    episodeID: {
      type: GraphQLInt
    },
    releaseDate: {
      type: GraphQLString
    }
  },
  connections: () => ({
    StarshipConnection: FilmStarshipConnectionObject
  })
});

const FilmStarshipConnectionObject = connection<StarshipFields, "starships">({
  name: "FilmStarshipConnection",
  nodeType: Starship,
  prop: "starships"
});

// To get an interface of Film that includes the starship connect, you just need to infer it

type Film = InferType<typeof GraphQLFilmObject> // No compile step needed!


// Type Film will now give you these type definitions:

type Film {
	title: string
	episodeID: number
  releaseDate: string

	StarshipConnection: {
		totalCount: number
		edges: {
			node: { // node: StarshipFields
				name: string
        starshipClass: string
			}
		}
		starships: [{ // starships: StarshipFields[] 
			name: string
      starshipClass: string
		}]
	}
}
```

