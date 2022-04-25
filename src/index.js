/* eslint-disable max-len */
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
  GraphQLFloat,
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
    studentsClass: {
      type: new GraphQLList(StudentType),
      description: 'List of all the students filtered based on the class',
      args: {
        class: { type: GraphQLInt },
      },
      resolve: (parent, args) => dbOperations.getStudentsByClass(args.class),
    },
    studentsClassSection: {
      type: new GraphQLList(StudentType),
      description: 'List of all the students filtered based on the class and section',
      args: {
        class: { type: GraphQLInt },
        section: { type: GraphQLString },
      },
      resolve: (parent, args) => dbOperations.getStudentsByClassSection(args.class, args.section),
    },
    studentsMarks: {
      type: new GraphQLList(StudentType),
      description: 'List of all the students filtered based on the marks',
      args: {
        totalMarks: { type: GraphQLFloat },
      },
      filter: (parent, args) => {
        console.log(args);
        return dbOperations.getStudentsByMarks(args.totalMarks);
      },
      resolve: (parent, args) => dbOperations.getStudentsByMarks(args.totalMarks),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    updateStudent: {
      type: StudentType,
      description: 'Update a student',
      args: {
        rollNo: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        class: { type: new GraphQLNonNull(GraphQLInt) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        totalMarks: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: (parent, args) => dbOperations.updateStudent(args.rollNo, args.name, args.class, args.section, args.totalMarks),
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
