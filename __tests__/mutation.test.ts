import { graphql } from "graphql";

import schema from "./swapi";

describe("mutation", () => {
  test("query - basic", () => {
    const query = `
      mutation Test($number: Int!) {
        addOne(input: { number: $number }) {
          number
        }
      }
    `;

    return expect(
      graphql(schema, query, null, null, {
        number: 1
      })
    ).resolves.toEqual({
      data: {
        addOne: {
          number: 2
        }
      }
    });
  });
});
