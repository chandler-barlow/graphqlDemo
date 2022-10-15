export const appMutation = `
    addApp(name: String!): App
    updateApp(id: String!, name: String!): App
    deleteApp(id: String!): String
`;
