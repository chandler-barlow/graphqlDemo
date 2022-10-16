"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageResolver = exports.deleteStage = exports.getAllStages = exports.getStage = exports.Stage = exports.stageFactory = void 0;
const crypto_1 = require("crypto");
const data_1 = __importDefault(require("../../data"));
const resolver_1 = require("../event/resolver");
function stageFactory({ id, name }) {
    return new Stage(id, name);
}
exports.stageFactory = stageFactory;
class Stage {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    events() {
        return data_1.default.events
            .filter((e) => e.stageId === this.id)
            .map((e) => (0, resolver_1.eventFactory)(e));
    }
}
exports.Stage = Stage;
function getStage(id) {
    let res = data_1.default.stages.filter((e) => e.id === id);
    if (res.length === 1) {
        return stageFactory(res[0]);
    }
    throw new Error(`invalid stage-id ${id}`);
}
exports.getStage = getStage;
function getAllStages(id) {
    return data_1.default.stages.map((e) => stageFactory(e));
}
exports.getAllStages = getAllStages;
function addStage({ name }) {
    const newStage = { id: (0, crypto_1.randomUUID)(), name: name };
    data_1.default.stages.push(newStage);
    return stageFactory(newStage);
}
function updateStage({ id, name }) {
    const res = data_1.default.stages.findIndex((e) => e.id === id);
    if (res) {
        data_1.default.stages[res] = Object.assign(Object.assign({}, data_1.default.stages[res]), { name });
        return stageFactory(data_1.default.stages[res]);
    }
    throw new Error(`Stage with id ${id} does not exist`);
}
function deleteStage({ id }) {
    const res = data_1.default.stages.findIndex((e) => e.id === id);
    if (typeof res !== "undefined") {
        data_1.default.stages = [
            ...data_1.default.stages.slice(0, res),
            ...data_1.default.stages.slice(res + 1, data_1.default.stages.length - 1),
        ];
        return "success";
    }
    return "failure";
}
exports.deleteStage = deleteStage;
exports.stageResolver = {
    getStage,
    getAllStages,
    updateStage,
    addStage,
    deleteStage,
};
