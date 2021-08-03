/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMap = /* GraphQL */ `
  query GetMap($id: ID!) {
    getMap(id: $id) {
      id
      name
      createdBy
      seed {
        color
        x
        y
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMaps = /* GraphQL */ `
  query ListMaps(
    $filter: ModelMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdBy
        seed {
          color
          x
          y
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
