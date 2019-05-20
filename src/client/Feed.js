import React, { Component } from 'react';
import '../../assets/css/style.css';
import client from './apollo';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';


const GET_POSTS = gql`{
  posts {
    id
    text
    user {
      avatar
      username }
  } }`;

const ADD_POST = gql`
  mutation addPost($post : PostInput!) {
    addPost(post : $post) {
      id
      text 
      user {
        username
        avatar }
} }`;

// class Feed extends Component {
export default class Feed extends Component {

  state = {
    postContent: '',
    userName: '',
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleSubmit = (event) => {
    const self = this;
    event.preventDefault();
    const newPost = {
      text: this.state.postContent
    };
    this.props.addPost({ variables: { post: newPost } })
      .then(() => {
        self.setState((prevState) => ({
          postContent: ''
        }));
      });
  };

  render() {
    const self = this;
    const { postContent } = this.state;

    return (
      <Query query={GET_POSTS}>
        {
          ({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return error.message;
            const { posts } = data;
            return (
              <div className="container">
                <div className="postForm">
                  <Mutation
                    update = {(store, { data: { addPost } }) => {
                      const data = store.readQuery({ query: GET_POSTS });
                      data.posts.unshift(addPost);
                      store.writeQuery({ query: GET_POSTS, data });
                    }}
                    optimisticResponse= {{
                      __typename: "mutation",
                      addPost: {
                        __typename: "Post",
                        text: postContent,
                        id: -1,
                        user: {
                          __typename: "User",
                          username: "Loading...",
                          avatar: "/public/loading.gif"
                        } }
                    }}
                    mutation={ADD_POST}>
                    {addPost => (
                      <form onSubmit={e => {
                        e.preventDefault();
                        addPost({
                          variables: {
                            post: {
                              text:
                              postContent
                            }
                          }
                        })
                          .then(() => {
                            self.setState((prevState) => ({
                              postContent: ''
                            }));
                          });
                      }}>
                        <textarea value={postContent}
                            onChange={self.handlePostContentChange}
                            placeholder="Write your custom post!"/>
                        <input type="submit" value="Submit"/>
                      </form>)}
                  </Mutation>
                </div>
                <div className="feed">
                  {posts.map((post, i) =>
                    <div key={post.id} className={'post ' + (post.id < 0 ? 'optimistic':
                      '')}>
                      <div className="header">
                        <img src={post.user.avatar} />
                        <h2>{post.user.username}</h2>
                      </div>
                      <p className="content">
                        {post.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        }
      </Query>
    );
  };
}

// const ADD_POST_MUTATION = graphql(ADD_POST, {
//   name: 'addPost'
// });
//
// const GET_POSTS_QUERY = graphql(GET_POSTS, {
//   props: ({ data: { loading, error, posts } }) => ({
//     loading,
//     posts,
//     error })
// });
// export default compose(GET_POSTS_QUERY, ADD_POST_MUTATION)(Feed);
