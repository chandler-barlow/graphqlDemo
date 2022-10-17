import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { graphQLResolvers, graphQLSchema } from "./schema";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(graphQLSchema),
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  res.send("I'm awake");
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
