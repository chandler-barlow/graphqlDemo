export const eventMutation = `
    addEvent( appId: String!, stageId: String!, name: String!, description: String!, image: String!, startsAt: Int!, endsAt: Int!): Event
    updateEvent(id: String!): Event
    deleteEvent(id: String!): String
`;
