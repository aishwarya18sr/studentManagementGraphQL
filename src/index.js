/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
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
const dbOperations = require('./services/db.services');

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
      description: 'List of all the students ',
      resolve: () => dbOperations.getStudents(),
    },
    student: {
      type: new GraphQLList(StudentType),
      description: 'Details of a student based on id',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => dbOperations.getStudentById(args.id),
    },
  }),
});
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addStudent: {
      type: new GraphQLList(StudentType),
      description: 'Add a student',
      args: {
        studentName: { type: new GraphQLNonNull(GraphQLString) },
        studentClass: { type: new GraphQLNonNull(GraphQLInt) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        rollNo: { type: new GraphQLNonNull(GraphQLInt) },
        totalMarks: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => dbOperations.addStudent(args.studentName, args.studentClass, args.section, args.rollNo, args.totalMarks),
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
