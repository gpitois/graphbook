const typeDefinitions = `
  directive @auth on QUERY | FIELD_DEFINITION | FIELD
  
  scalar Upload
  
  type User {
    id: Int
    avatar: String
    username: String
    email: String
  }
  
  type Post {
     id: Int
     text: String
     user: User
  }
  
  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }
  
  type Chat {
    id: Int
    messages: [Message]
    users: [User]
    lastMessage: Message
  }
  
  type PostFeed {
    posts: [Post]
  }
  
  type Response {
    success: Boolean
  }
  
  type UsersSearch {
    users: [User]
  }
  
  type Auth {
    token: String
  }
  
  type File {
    filename: String!
    url: String!
  }

  input PostInput {
    text: String!
  }
   
  input UserInput {
    username: String!
    avatar: String!
  }
   
  input ChatInput {
    users: [Int]
  }
  
  input MessageInput {
    text: String!
    chatId: Int!
  }
   
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post @auth
    updatePost (
      post: PostInput!
      postId: Int!
    ): Post  @auth
    deletePost (
      postId: Int!
    ): Response @auth
    addChat (
      chat: ChatInput!
    ): Chat @auth
    addMessage (
      message: MessageInput!
    ): Message @auth
    login (
     email: String!
     password: String!
    ): Auth
    signup (
     username: String!
     email: String!
     password: String!
    ): Auth
    uploadAvatar (
      file: Upload!
    ): File @auth
    logout: Response @auth
  }
   
  type RootQuery {
    posts: [Post] @auth
    chats: [Chat] @auth
    chat(chatId: Int): Chat @auth
    postsFeed(page: Int, limit: Int, username: String): PostFeed @auth
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch
    currentUser: User @auth
    user(username: String!): User @auth
  }
  
  type RootSubscription {
    messageAdded: Message
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
}
`;


export default [typeDefinitions];
