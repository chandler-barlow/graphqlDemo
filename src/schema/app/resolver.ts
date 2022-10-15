import { randomUUID } from "crypto";
import data from "../../data";
import { Event, eventFactory } from "../event/resolver";

export function appFactory({ id, name }: App): App {
  return new App(id, name);
}

export class App {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  events() {
    return data.events
      .filter((e) => e.appId === this.id)
      .map((e) => eventFactory(e as Event));
  }
}

export function getApp(id: string): App {
  const res: any = data.apps.filter((e) => e.id === id);
  if (res && res.length === 1) {
    return appFactory(res[0] as App);
  }
  throw new Error(`App with id ${id} does not exist`);
}

export function getAllApps(): App[] {
  return data.apps.map((e) => appFactory(e as App));
}

// returns id of updated app
function updateApp({ id, name }: App): App {
  const res = data.apps.findIndex((e) => e.id === id);
  if (res) {
    data.apps[res].name = name;
    return appFactory(data.apps[-1] as App);
  }
  throw new Error(`invalid app-id ${id} at update app `);
}

// returns id of new app entry
function addApp({ name }: { [key: string]: string }): App {
  console.log(data.apps);
  const newApp = { id: randomUUID(), name: name };
  data.apps.push(newApp);
  return appFactory(newApp as App);
}

function deleteApp({ id }: { [key: string]: string }) {
  console.log(id);
  const res = data.apps.findIndex((e) => e.id === id);
  console.log(res);
  if (typeof res !== "undefined") {
    data.apps = [
      ...data.apps.slice(0, res),
      ...data.apps.slice(res + 1, data.apps.length - 1),
    ];
    return "success";
  }
  return "failure";
}

export const appResolver = { getApp, getAllApps, updateApp, addApp, deleteApp };
