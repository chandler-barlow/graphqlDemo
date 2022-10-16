"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genSchema = exports.mergeDefs = void 0;
function mergeDefs(defs, type) {
    if (type === "Type") {
        return defs.reduce((acc, e) => acc + e, "\n");
    }
    return `type ${type} {
        ${defs.reduce((acc, e) => `${acc}\n${e}`, "")}
    }`;
}
exports.mergeDefs = mergeDefs;
const genSchema = (...args) => mergeDefs(args, "Type");
exports.genSchema = genSchema;
