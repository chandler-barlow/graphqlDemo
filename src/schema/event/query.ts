export const eventQuery = `
    getEvent(id: String!): Event
    getEventsByName(name: String!): [Event]
    getEventsByDateRange(from: Int!, to: Int!): [Event]
    getAllEvents: [Event]
`;
