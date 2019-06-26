import React from 'react';

export default ({ post }) =>
  <div className="header">
    <img src={post.user.avatar} alt="" />
    <div>
      <h2>{post.user.username}</h2>
    </div>
  </div>;
