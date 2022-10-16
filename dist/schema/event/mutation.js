"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventMutation = void 0;
exports.eventMutation = `
    addEvent( appId: String!, stageId: String!, name: String!, description: String!, image: String!, startsAt: Int!, endsAt: Int!): Event
    updateEvent(id: String!): Event
    deleteEvent(id: String!): String
`;
