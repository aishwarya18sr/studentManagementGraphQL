const express = require('express');
const env = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/schema');

env.config();
const port = process.env.PORT || 8000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
