"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMutation = void 0;
exports.appMutation = `
    addApp(name: String!): App
    updateApp(id: String!, name: String!): App
    deleteApp(id: String!): String
`;
