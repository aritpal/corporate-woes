import React, { useState } from 'react';
import axios from 'axios';

const API_URL_BASE = 'http://localhost:8080/api/v1';

const AddCommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL_BASE}/posts/${postId}/comments`, { content });
      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
      setContent('');
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err.response?.data?.message || "Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h4 className="text-lg font-semibold mb-2 text-gray-700">Add a Comment</h4>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-indigo-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
};

export default AddCommentForm;