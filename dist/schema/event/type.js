"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventType = void 0;
exports.eventType = `
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
