import logger from '../../helpers/logger';


export default function resolver() {
  const { db } = this;
  const { Post, User, Chat, Message } = db.models;
  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
      chats(root, args, context) {
        return User.findAll().then((users) => {
          if (!users.length) {
            return [];
          }
          const usersRow = users[0];
          return Chat.findAll({
            include: [{
              model: User,
              required: true,
              through: { where: { userId: usersRow.id } },
            }, {
              model: Message,
            }],
          });
        });
      },
      chat(root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [{
            model: User,
            required: true,
          }, {
            model: Message,
          }],
        });
      },
      postsFeed(root, { page, limit }, context) {
        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }
        let query = {
          order: [['createdAt', 'DESC']],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }
        return {
          posts: Post.findAll(query),
        };
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        logger.log({
          level: 'info',
          message: 'Post was created',
        });
        return User.findAll().then((users) => {
          const usersRow = users[0];
          return Post.create({
            ...post,
          }).then((newPost) => {
            return Promise.all([
              newPost.setUser(usersRow.id),
            ]).then(() => {
              return newPost;
            });
          });
        });
      },
      updatePost(root, { post, postId }, context) {
        return Post.update(
          { ...post },
          {
            where: { id: postId },
          })
          .then((rows) => {
            if (rows[0] === 1) {
              logger.log({
                level: 'info',
                message: `Post ${postId} was updated`,
              });
              return Post.findById(postId);
            }
          });
      },
      addChat(root, { chat }, context) {
        logger.log({
          level: 'info',
          message: 'Message was created',
        });
        return Chat.create()
          .then((newChat) => {
            return Promise.all([
              newChat.setUsers(chat.users),
            ])
              .then(() => {
                return newChat;
              });
          });
      },
      addMessage(root, { message }, context) {
        logger.log({
          level: 'info',
          message: 'Message was created',
        });
        return User.findAll().then((users) => {
          const usersRow = users[0];
          return Message.create({
            ...message,
          }).then((newMessage) => {
            return Promise.all([
              newMessage.setUser(usersRow.id),
              newMessage.setChat(message.chatId),
            ]).then(() => {
              return newMessage;
            });
          });
        });
      },
    },
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
    },
  };
  return resolvers;
}
