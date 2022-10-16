"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
const port = "8080";
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: (0, graphql_1.buildSchema)(schema_1.graphQLSchema),
    rootValue: schema_1.graphQLResolvers,
    graphiql: true,
}));
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send({ error: err });
});
app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
