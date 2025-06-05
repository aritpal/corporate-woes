import React, { useState } from 'react';
import axios from 'axios';

const API_URL_BASE = 'http://localhost:8080/api/v1';

const AddCommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!content.trim()) {
      setError("Comment content cannot be blank.");
      return false;
    }
    if (content.trim().length > 2000) {
      setError("Comment content cannot exceed 2000 characters.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL_BASE}/posts/${postId}/comments`, { content });
      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
      setContent('');
    } catch (err) {
      console.error("Error adding comment:", err);
      let specificMessage = "Failed to add comment. Please try again.";
      if (err.response && err.response.data) {
        if (err.response.data.validationErrors) {
          const validationMessages = Object.values(err.response.data.validationErrors).join(' ');
          specificMessage = `Validation failed: ${validationMessages}`;
        } else if (err.response.data.message) {
          specificMessage = err.response.data.message;
        }
      }
      setError(specificMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-slate-200">
      <h4 className="text-lg font-medium mb-3 text-slate-700">Add a Comment</h4>
      {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-md border border-red-200">{error}</p>}
      <textarea
        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-colors duration-150 text-slate-700 ${error && !content.trim() ? 'border-red-400' : 'border-slate-300'}`}
        rows="3"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (error) validateForm();
        }}
        placeholder="Write your comment..."
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="mt-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition-colors duration-150 disabled:bg-sky-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
};

export default AddCommentForm;