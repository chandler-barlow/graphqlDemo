import { genSchema, mergeDefs } from "../utils/mergeDefs";

import { appType } from "./app/type";
import { eventType } from "./event/type";
import { stageType } from "./stage/type";

import { appResolver } from "./app/resolver";
import { eventResolvers } from "./event/resolver";
import { stageResolver } from "./stage/resolver";

import { appQuery } from "./app/query";
import { eventQuery } from "./event/query";
import { stageQuery } from "./stage/query";

import { appMutation } from "./app/mutation";
import { eventMutation } from "./event/mutation";
import { stageMutation } from "./stage/mutation";

const types = [appType, eventType, stageType];
const queries = [appQuery, eventQuery, stageQuery];
const mutations = [appMutation, eventMutation, stageMutation];
const graphqlTypes = mergeDefs(types, "Type");
const graphqlQueries = mergeDefs(queries, "Query");
const graphqlMutations = mergeDefs(mutations, "Mutation");

export const graphQLSchema: string = genSchema(
  graphqlTypes,
  graphqlQueries,
  graphqlMutations
);
export const graphQLResolvers = {
  ...appResolver,
  ...eventResolvers,
  ...stageResolver,
};
