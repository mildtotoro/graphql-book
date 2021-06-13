const { GraphQLServer } = require("graphql-yoga");
const books = [
  {
    id: "1",
    name: "harry 1",
    price: 210,
    isTopTen: true,
    publisher: {
      name: "naanmee book",
      author: "JK Roling",
      edition: 1,
    },
  },
  {
    id: "2",
    name: "อย่ายอม",
    price: 390,
    isTopTen: false,
    publisher: {
      name: "amarin book",
      author: "Henry",
      edition: 1,
    },
  },
  {
    id: "3",
    name: "sapiens",
    price: 439,
    isTopTen: true,
    publisher: {
      name: "naanmee book",
      author: "ใครวะ",
      edition: 3,
    },
  },
];

// Schemas
const typeDefs = `
    type Query {
        name: String!
        price: Int!
        isTopTen: Boolean
        numbers: [Int!]!
        publisher: publisher
        books: [book!]!
    }

    type publisher {
        name: String!,
        author: String!,
        edition: Int
    }

    type book {
        id: ID!,
        name: String!
        publisher: publisher
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
    numbers() {
      return [10, 20, 30, 40];
    },
    publisher() {
      return {
        name: "naanmee book",
        author: "JK Roling",
        edition: 1,
      };
    },
    books() {
      return books;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const options = {
  port: 4000,
  endpoint: "/graphql",
};

server.start(options, ({ port }) => {
  console.log(`Server started on port ${port}.`);
});
