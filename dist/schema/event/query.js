"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventQuery = void 0;
exports.eventQuery = `
    getEvent(id: String!): Event
    getEventsByName(name: String!): [Event]
    getEventsByDateRange(from: Int!, to: Int!): [Event]
    getAllEvents: [Event]
`;
