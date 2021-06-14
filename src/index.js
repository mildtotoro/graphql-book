const { GraphQLServer } = require("graphql-yoga");
const { v4: uuidv4 } = require("uuid");
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
        publisher: Publisher
        books: [Book!]!
    }

    type Publisher {
        name: String!,
        author: String!,
        edition: Int
    }

    type Book {
        id: ID!,
        name: String!
        price: Int!
        publisher: Publisher
    }

    type Mutation {
        addBook(name: String!, price: Int!): [Book!]!
        updateBook(id: ID!, name: String, price: Int): Book!
        deleteBook(id: ID!): Book!
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
  Mutation: {
    addBook(parent, args, ctx, info) {
      const { name, price } = args;
      books.push({
        id: uuidv4(),
        name,
        price,
      });

      return books;
    },
    updateBook(parent, args, ctx, info) {
      const { id, name, price } = args;
      const book = books.find((b) => {
        return b.id === id;
      });

      if (!book) {
        throw new Error(`Book ${id} doesn't exist.`);
      }
      if (name) {
        book.name = name;
      }
      if (price) {
        book.price = price;
      }
      return book;
    },
    deleteBook(parent, args, ctx, info) {
      const { id } = args;
      const index = books.findIndex((book) => {
        return book.id === id;
      });
      if (index === -1) {
        throw new Error(`Book with id ${id} doesn't exists.`);
      }

      const deletedBook = books.splice(index, 1);
      return deletedBook[0];
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
