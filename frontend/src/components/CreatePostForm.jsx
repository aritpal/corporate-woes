import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/posts'; //

const CreatePostForm = ({ onPostCreated }) => { //
  const [content, setContent] = useState(''); //
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => { //
    e.preventDefault(); //
    if (!content.trim()) { //
      setError("Content cannot be empty.");
      return;
    }

    setIsSubmitting(true); //
    setError(null);

    try {
      const response = await axios.post(API_URL, { content }); //
      onPostCreated(response.data); //
      setContent(''); //
    } catch (err) { //
      console.error("Error creating post:", err);
      setError(err.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false); //
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Share Your Woes</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        rows="4"
        value={content} //
        onChange={e => setContent(e.target.value)} //
        placeholder="What's grinding your gears today?"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-indigo-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sharing...' : 'Share Anonymously'}
      </button>
    </form>
  );
};

export default CreatePostForm; //