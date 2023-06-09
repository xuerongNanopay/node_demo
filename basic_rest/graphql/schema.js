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
    username: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]
  }

  input UserSignInData {
    email: String!
    username: String!
    password: String!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  input PostInputDate {
    title: String!
    content: String!
  }

  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }

  type RootMutation {
    signUpUser(userInput: UserSignInData): User!
    createPost(postInput: PostInputDate): Post!
    updatePost(id: String!, postInput: PostInputDate!): Post!
  }

  type RootQuery {
    signInUser(email: String!, password: String!): AuthData!
    fetchPost(page: Int): PostData!
    fetchPostById(id: String!): Post!
    deletePost(id: ID!): Boolean!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)