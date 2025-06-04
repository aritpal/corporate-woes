import React from 'react';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
    <div className="flex justify-between items-center text-sm text-gray-600">
      <span>Upvotes: {post.upvotes}</span>
      <span>Comments: {post.commentCount || 0}</span>
      <span>{new Date(post.createdAt).toLocaleString()}</span>
    </div>
  </div>
);

export default PostCard;