import { ApolloServer } from "apollo-server-lambda";
import { buildFederatedSchema } from "@apollo/federation";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs,
    resolvers
  }),
  playground: true,
  introspection: true,
  subscriptions: false,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

export const graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
    methods: "GET, POST",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  }
});
