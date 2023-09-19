const graphql = require("graphql");
// const _ = require("lodash");
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// const users = [
//   { id: "23", firstName: "Tom", age: 52 },
//   { id: "47", firstName: "Bob", age: 39 },
// ];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data)
          
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
