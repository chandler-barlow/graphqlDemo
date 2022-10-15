import { randomUUID } from "crypto";
import data from "../../data";
import { Event, eventFactory } from "../event/resolver";

export function stageFactory({ id, name }: Stage): Stage {
  return new Stage(id, name);
}

export class Stage {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  events() {
    return data.events
      .filter((e) => e.stageId === this.id)
      .map((e) => eventFactory(e as Event));
  }
}

export function getStage(id: string) {
  let res = data.stages.filter((e) => e.id === id);
  if (res.length === 1) {
    return stageFactory(res[0] as Stage);
  }
  throw new Error(`invalid stage-id ${id}`);
}

export function getAllStages(id: string) {
  return data.stages.map((e) => stageFactory(e as Stage));
}

function addStage({ name }: { [key: string]: string }): Stage {
  const newStage = { id: randomUUID(), name: name };
  data.stages.push(newStage);
  return stageFactory(newStage as Stage);
}
function updateStage({ id, name }: { [key: string]: string }) {
  const res = data.stages.findIndex((e) => e.id === id);
  if (res) {
    data.stages[res] = { ...data.stages[res], name };
    return stageFactory(data.stages[res] as Stage);
  }
  throw new Error(`Stage with id ${id} does not exist`);
}

export function deleteStage({ id }: { [key: string]: string }) {
  const res = data.stages.findIndex((e) => e.id === id);
  if (typeof res !== "undefined") {
    data.stages = [
      ...data.stages.slice(0, res),
      ...data.stages.slice(res + 1, data.stages.length - 1),
    ];
    return "success";
  }
  return "failure";
}

export const stageResolver = {
  getStage,
  getAllStages,
  updateStage,
  addStage,
  deleteStage,
};
