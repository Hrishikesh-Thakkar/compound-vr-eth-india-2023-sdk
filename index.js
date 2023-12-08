const { graphql, buildSchema } = require('graphql');

// Builds a schema using the GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root of our graph gives us access to resolvers for each type and field
const resolversRoot = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run a simple graphql query '{ hello }' and then print the response
graphql(schema, '{ hello }', resolversRoot).then((response) => {
  console.log(JSON.stringify(response.data));
});