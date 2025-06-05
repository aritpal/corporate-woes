import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/posts';

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!content.trim()) {
      setError("Post content cannot be blank.");
      return false;
    }
    if (content.trim().length > 5000) {
      setError("Post content cannot exceed 5000 characters.");
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
      const response = await axios.post(API_URL, { content });
      if (onPostCreated) {
        onPostCreated(response.data);
      }
      setContent('');
    } catch (err) {
      console.error("Error creating post:", err);
      let specificMessage = "Failed to create post. Please try again.";
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
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-5 sm:p-6 mb-8 border border-slate-200">
      <h2 className="text-xl font-medium mb-4 text-slate-700">Share Your Woes</h2>
      {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-md border border-red-200">{error}</p>}
      <textarea
        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-colors duration-150 text-slate-700 ${error && !content.trim() ? 'border-red-400' : 'border-slate-300'}`}
        rows="4"
        value={content}
        onChange={e => {
          setContent(e.target.value);
          if (error) validateForm();
        }}
        placeholder="What's grinding your gears today?"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition-colors duration-150 disabled:bg-sky-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sharing...' : 'Share Anonymously'}
      </button>
    </form>
  );
};

export default CreatePostForm;