# graphqlDemo

The url for this is http://graphqldemo-dev.us-west-1.elasticbeanstalk.com/api </br>
The health check endpoint is http://graphqldemo-dev.us-west-1.elasticbeanstalk.com

# Schema

```graphql
type App {
  id: String!
  name: String!
  events: [Event]
}

type Event {
  id: String!
  appId: String!
  app: App
  stageId: String!
  stage: Stage
  name: String!
  description: String!
  image: String!
  startsAt: Int!
  endsAt: Int!
}

type Stage {
  id: String!
  name: String!
  events: Event
}

type Query {
  getAllApps: [App]
  getApp: [App]

  getEvent(id: String!): Event
  getEventsByName(name: String!): [Event]
  getEventsByDateRange(from: Int!, to: Int!): [Event]
  getAllEvents: [Event]

  getStage(id: String!): Stage
  getAllStages: [Stage]
}

type Mutation {
  addApp(name: String!): App
  updateApp(id: String!, name: String!): App
  deleteApp(id: String!): String

  addEvent(
    appId: String!
    stageId: String!
    name: String!
    description: String!
    image: String!
    startsAt: Int!
    endsAt: Int!
  ): Event
  updateEvent(id: String!): Event
  deleteEvent(id: String!): String

  addStage(id: String!, name: String!): String
  updateStage(id: String!): String
  deleteStage(id: String!): String
}
```
