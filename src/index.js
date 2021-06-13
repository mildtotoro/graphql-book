const { GraphQLServer } = require("graphql-yoga");

// Schemas
const typeDefs = `
    type = Query {
        name: String!
        price: Int!,
        isTopTen: Boolean
    }
`;

const resolvers = {
  Query: {
    name() {
      return "Harry Potter and The Succurror stone";
    },
    price() {
      return 200;
    },
    isTopTen() {
      return null;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const options = {
  port: 4000,
  entpoing: "/graphql",
};

server.start(options, ({ port }) => {
  console.log(`Server started on port ${port}.`);
});
