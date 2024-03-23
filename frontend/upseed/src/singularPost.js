import React from 'react';
import { Link } from 'react-router-dom';

function Feed() {
  // Assuming posts is an array of post objects
//   const posts = [...];

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/post/${post.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default Feed;