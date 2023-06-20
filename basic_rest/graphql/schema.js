const { buildSchema } = require('graphql')

// module.exports = buildSchema(`
//   type RootQuery {
//     hello: TestData!
//   }

//   type TestData {
//     text: String!
//     views: Int!
//   }

//   schema {
//     query: RootQuery
//   }
// `)

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    content: String!
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]
  }

  input UserSignInData {
    email: String!
    password: String!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type RootMutation {
    signUpUser(userInput: UserSignInData): User!
  }

  type RootQuery {
    signInUser(email: String!, password: String!): AuthData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)