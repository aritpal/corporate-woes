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
      // Consider a more user-friendly error notification
      alert(error.response?.data?.message || "Upvote failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-5 sm:p-6 mb-6 border border-slate-200">
      <p className="text-slate-700 mb-4 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={handleUpvote}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors duration-150 mr-3"
          >
            Upvote
          </button>
          <span>Upvotes: {post.upvotes}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={`/post/${post.id}`} className="hover:text-sky-600 hover:underline">
            <span>Comments: {post.commentCount || 0}</span>
          </Link>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;