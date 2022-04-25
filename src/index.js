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
    deleteStudent: {
      type: new GraphQLList(StudentType),
      description: 'Delete a student',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => dbOperations.deleteStudent(args.id),
    },
    updateStudent: {
      type: StudentType,
      description: 'Update a student',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        rollNo: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        class: { type: new GraphQLNonNull(GraphQLInt) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        totalMarks: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: (parent, args) => dbOperations.updateStudent(args.id, args.rollNo, args.name, args.class, args.section, args.totalMarks),
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
