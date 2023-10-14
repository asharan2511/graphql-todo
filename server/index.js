import express, { query } from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
import { USER } from "./user.js";
import { TODO } from "./todo.js";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
      id:ID!
      name:String!
      email:String!
      phone:String!
      website:String
    }
    type Todo{
        id:ID!
        title:String!
        completed:Boolean
        userId:ID!
        user:User
    }
    type Query{
        getTodos:[Todo]
        getUsers:[User]
        getUser(id:ID!):User

    }
    `,
    resolvers: {
      Todo: {
        user: (todo) => USER.find((e) => e.id === todo.id),
      },
      Query: {
        getTodos: () => TODO,
        getUsers: () => USER,
        getUser: async (parent, { id }) => USER.find((e) => e.id === id),
      },
    },
  });
  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => {
    console.log(`server is running on the server: 8000`);
  });
};

startServer();
