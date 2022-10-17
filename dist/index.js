"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const schema_1 = require("./schema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use("/api", (0, express_graphql_1.graphqlHTTP)({
    schema: (0, graphql_1.buildSchema)(schema_1.graphQLSchema),
    rootValue: schema_1.graphQLResolvers,
    graphiql: true,
}));
app.get("/", (req, res) => {
    res.send("I'm awake");
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send({ error: err });
});
app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
