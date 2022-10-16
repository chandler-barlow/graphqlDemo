"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventResolvers = exports.Event = exports.eventFactory = void 0;
const crypto_1 = require("crypto");
const data_1 = __importDefault(require("../../data"));
const resolver_1 = require("../stage/resolver");
const resolver_2 = require("../app/resolver");
function eventFactory({ id, appId, stageId, name, description, image, startsAt, endsAt, }) {
    return new Event(id, appId, stageId, name, description, image, startsAt, endsAt);
}
exports.eventFactory = eventFactory;
class Event {
    constructor(id, appId, stageId, name, description, image, startsAt, endsAt) {
        this.id = id;
        this.appId = appId;
        this.stageId = stageId;
        this.name = name;
        this.description = description;
        this.image = image;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }
    stage() {
        return (0, resolver_1.getStage)(this.stageId);
    }
    app() {
        return (0, resolver_2.getApp)(this.appId);
    }
}
exports.Event = Event;
function getAllEvents() {
    return data_1.default.events.map((e) => eventFactory(e));
}
function getEvent({ id }) {
    const event = data_1.default.events.filter((e) => e.id === id);
    if (event && event.length === 1) {
        return eventFactory(event[0]);
    }
    throw new Error(`The requested event-id ${id} does not exist`);
}
function getEventsByName({ name }) {
    const res = data_1.default.events.filter((e) => e.name.includes(name));
    console.log(res);
    return res.map((e) => eventFactory(e));
}
function getEventsByDateRange({ from, to }) {
    const res = data_1.default.events.filter((e) => from <= e.startsAt && to >= e.endsAt);
    return res.map((e) => eventFactory(e));
}
// returns id of updated app
function updateEvent(updatedEventFields) {
    if (!updatedEventFields.id) {
        throw new Error("ID must be included when updating events");
    }
    const res = data_1.default.events.findIndex((e) => e.id === updatedEventFields.id);
    if (res) {
        data_1.default.events[res] = Object.assign(Object.assign({}, data_1.default.events[res]), updateEvent);
        return eventFactory(data_1.default.events[-1]);
    }
    throw new Error(`invalid app-id ${updatedEventFields.id} at update app `);
}
function addEvent(newEvent) {
    const event = Object.assign(Object.assign({}, newEvent), { id: (0, crypto_1.randomUUID)() });
    data_1.default.events.push(event);
    return eventFactory(event);
}
function deleteEvent({ id }) {
    const res = data_1.default.events.findIndex((e) => e.id === id);
    if (typeof res !== "undefined") {
        data_1.default.events = [
            ...data_1.default.events.slice(0, res),
            ...data_1.default.events.slice(res + 1, data_1.default.events.length - 1),
        ];
        return "success";
    }
    return "failure";
}
exports.eventResolvers = {
    getEvent,
    getAllEvents,
    getEventsByName,
    getEventsByDateRange,
    updateEvent,
    addEvent,
    deleteEvent,
};
