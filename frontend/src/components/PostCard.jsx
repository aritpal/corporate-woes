import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL_BASE = 'http://localhost:8080/api/v1';

const PostCard = ({ post, onPostUpdated }) => {
  const handleUpvote = async () => {
    try {
      const response = await axios.post(`${API_URL_BASE}/posts/${post.id}/upvote`);
      if (onPostUpdated) {
        onPostUpdated(response.data);
      }
    } catch (error) {
      console.error("Error upvoting post:", post.id, error);
      // Consider displaying an error message to the user
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          <button
            onClick={handleUpvote}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md mr-2"
          >
            Upvote
          </button>
          <span>Upvotes: {post.upvotes}</span>
        </div>
        <Link to={`/post/${post.id}`} className="hover:underline">
          <span>Comments: {post.commentCount || 0}</span>
        </Link>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostCard;