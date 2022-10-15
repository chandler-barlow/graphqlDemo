import { randomUUID } from "crypto";
import data from "../../data";
import { getStage, Stage } from "../stage/resolver";
import { getApp, App } from "../app/resolver";

export function eventFactory({
  id,
  appId,
  stageId,
  name,
  description,
  image,
  startsAt,
  endsAt,
}: Event): Event {
  return new Event(
    id,
    appId,
    stageId,
    name,
    description,
    image,
    startsAt,
    endsAt
  );
}

export class Event {
  id: string;
  appId: string;
  stageId: string;
  name: string;
  description: string;
  image: string;
  startsAt: number;
  endsAt: number;

  constructor(
    id: string,
    appId: string,
    stageId: string,
    name: string,
    description: string,
    image: string,
    startsAt: number,
    endsAt: number
  ) {
    this.id = id;
    this.appId = appId;
    this.stageId = stageId;
    this.name = name;
    this.description = description;
    this.image = image;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
  }
  stage(): Stage {
    return getStage(this.stageId);
  }
  app(): App {
    return getApp(this.appId);
  }
}

function getAllEvents(): Event[] {
  return data.events.map((e) => eventFactory(e as Event));
}

function getEvent({ id }: any) {
  const event = data.events.filter((e) => e.id === id);
  if (event && event.length === 1) {
    return eventFactory(event[0] as Event);
  }
  throw new Error(`The requested event-id ${id} does not exist`);
}

function getEventsByName({ name }: any): Event[] {
  const res = data.events.filter((e) => e.name.includes(name));
  console.log(res);
  return res.map((e) => eventFactory(e as Event));
}

function getEventsByDateRange({ from, to }: any): Event[] {
  const res = data.events.filter((e) => from <= e.startsAt && to >= e.endsAt);
  return res.map((e) => eventFactory(e as Event));
}

interface UpdatedEvent {
  id: string;
  name?: string;
  appId?: string;
  app?: string;
  stageId?: string;
  stage?: string;
  description?: string;
  image?: string;
  startsAt?: number;
  endsAt?: number;
}

// returns id of updated app
function updateEvent(updatedEventFields: UpdatedEvent): Event {
  if (!updatedEventFields.id) {
    throw new Error("ID must be included when updating events");
  }
  const res = data.events.findIndex((e) => e.id === updatedEventFields.id);
  if (res) {
    data.events[res] = { ...data.events[res], ...updateEvent };
    return eventFactory(data.events[-1] as Event);
  }
  throw new Error(`invalid app-id ${updatedEventFields.id} at update app `);
}

interface NewEvent {
  name: string;
  appId: string;
  app: string;
  stageId: string;
  stage: string;
  description: string;
  image: string;
  startsAt: number;
  endsAt: number;
}

function addEvent(newEvent: NewEvent): Event {
  const event: any = {
    ...newEvent,
    id: randomUUID(),
  };
  data.events.push(event);
  return eventFactory(event as Event);
}

function deleteEvent({ id }: { [key: string]: string }): string {
  const res = data.events.findIndex((e) => e.id === id);
  if (typeof res !== "undefined") {
    data.events = [
      ...data.events.slice(0, res),
      ...data.events.slice(res + 1, data.events.length - 1),
    ];
    return "success";
  }
  return "failure";
}

export const eventResolvers = {
  getEvent,
  getAllEvents,
  getEventsByName,
  getEventsByDateRange,
  updateEvent,
  addEvent,
  deleteEvent,
};
