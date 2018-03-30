const express = require('express');
const graphqlHTTP = require('express-graphql')
const app = express();
const PORT = process.env.PORT || 3000;

// function, the actual executor of the schema
const { graphql } = require('graphql');

const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  database: 'lo',
  user: 'lo',
  password: 'lotest'
});

const db = require('./database')(pool);
const DataLoader = require('dataloader');

// the schema to execute
const mySchema = require('./schema');

app.use('/graphql', (req, res) => {
  const loaders = {
    usersByIds: new DataLoader(db.getUsersByIds)
  };

  return graphqlHTTP({
    schema: mySchema,
    graphiql: true,
    context: { pool, loaders }, // available to all graphql resolve as the third argument
  })(req, res);
});

app.listen(PORT);

console.log('server started on: ' + PORT);
