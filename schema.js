const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

// const humps = require('humps');
const db = require('./database');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
});


const queryType = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      // 4th is execution context ----v
      resolve: ( obj, args, { loaders }, info ) => loaders.usersByIds.load(args.id)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: ( obj, args, { pool } ) => db(pool).getUsers()
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
  // mutation: mutationType
});

module.exports = mySchema;
