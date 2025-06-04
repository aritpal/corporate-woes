import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onPostUpdated }) => {
  return (
    <div>
      {posts && posts.map(post => (
        <PostCard key={post.id} post={post} onPostUpdated={onPostUpdated} />
      ))}
    </div>
  );
};

export default PostList;