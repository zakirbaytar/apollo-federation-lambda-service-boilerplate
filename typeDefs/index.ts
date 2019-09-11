import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  extend type Query {
    service: String!
  }
`;
