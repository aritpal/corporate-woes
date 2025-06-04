import React from 'react';
import axios from 'axios';

const API_URL_BASE = 'http://localhost:8080/api/v1';

const PostCard = ({ post, onPostUpdated }) => {
  const handleUpvote = async () => {
    console.log('PostCard: handleUpvote called for post ID:', post.id, 'Post object:', post);
    const apiUrl = `${API_URL_BASE}/posts/${post.id}/upvote`;
    console.log('PostCard: Attempting to call API URL:', apiUrl);
    try {
      const response = await axios.post(apiUrl);
      console.log('PostCard: Upvote API Response Data:', response.data);
      if (onPostUpdated) {
        console.log('PostCard: Calling onPostUpdated with:', response.data);
        onPostUpdated(response.data);
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
      // You might want to set an error state here to display to the user
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
        <span>Comments: {post.commentCount || 0}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostCard;