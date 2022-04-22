/* eslint-disable no-console */
const express = require('express');
const env = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const dbOperations = require('./services/dbOperations.service');

env.config();
const port = process.env.PORT || 8000;
const app = express();

const StudentType = new GraphQLObjectType({
  name: 'Student',
  description: 'This reprsents a student',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    rollNo: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    class: { type: new GraphQLNonNull(GraphQLString) },
    section: { type: new GraphQLNonNull(GraphQLString) },
    totalMarks: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    students: {
      type: new GraphQLList(StudentType),
      description: 'List of all the students filtered based on the class',
      args: {
        class: { type: GraphQLInt },
      },
      resolve: (parent, args) => dbOperations.getStudentsByClass(args.class),
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});