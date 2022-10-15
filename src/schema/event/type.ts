export const eventType = `
    type Event {
        id: String!
        appId: String!
        app: App
        stageId: String!
        stage: Stage
        name: String!
        description: String!
        image: String!
        startsAt: Int!
        endsAt: Int!
    }
`;
