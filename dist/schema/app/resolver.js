"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appResolver = exports.getAllApps = exports.getApp = exports.App = exports.appFactory = void 0;
const crypto_1 = require("crypto");
const data_1 = __importDefault(require("../../data"));
const resolver_1 = require("../event/resolver");
function appFactory({ id, name }) {
    return new App(id, name);
}
exports.appFactory = appFactory;
class App {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    events() {
        return data_1.default.events
            .filter((e) => e.appId === this.id)
            .map((e) => (0, resolver_1.eventFactory)(e));
    }
}
exports.App = App;
function getApp(id) {
    const res = data_1.default.apps.filter((e) => e.id === id);
    if (res && res.length === 1) {
        return appFactory(res[0]);
    }
    throw new Error(`App with id ${id} does not exist`);
}
exports.getApp = getApp;
function getAllApps() {
    return data_1.default.apps.map((e) => appFactory(e));
}
exports.getAllApps = getAllApps;
// returns id of updated app
function updateApp({ id, name }) {
    const res = data_1.default.apps.findIndex((e) => e.id === id);
    if (res) {
        data_1.default.apps[res].name = name;
        return appFactory(data_1.default.apps[-1]);
    }
    throw new Error(`invalid app-id ${id} at update app `);
}
// returns id of new app entry
function addApp({ name }) {
    console.log(data_1.default.apps);
    const newApp = { id: (0, crypto_1.randomUUID)(), name: name };
    data_1.default.apps.push(newApp);
    return appFactory(newApp);
}
function deleteApp({ id }) {
    console.log(id);
    const res = data_1.default.apps.findIndex((e) => e.id === id);
    console.log(res);
    if (typeof res !== "undefined") {
        data_1.default.apps = [
            ...data_1.default.apps.slice(0, res),
            ...data_1.default.apps.slice(res + 1, data_1.default.apps.length - 1),
        ];
        return "success";
    }
    return "failure";
}
exports.appResolver = { getApp, getAllApps, updateApp, addApp, deleteApp };
