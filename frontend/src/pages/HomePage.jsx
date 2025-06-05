import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';

const API_URL = 'http://localhost:8080/api/v1/posts';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setPosts(response.data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        let errorMessage = "Failed to fetch posts. Please try again later.";
        if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
        }
        setError(errorMessage);
        setLoading(false);
      });
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    if (error && error.startsWith("Failed to fetch posts")) {
        setError(null);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === updatedPost.id ? updatedPost : p
      )
    );
  };

  if (loading) return <p className="text-center text-slate-500 py-10">Loading posts...</p>;
  if (error && posts.length === 0) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePostForm onPostCreated={handlePostCreated} />
      {error && posts.length > 0 && <p className="text-center text-red-400 text-sm my-4 p-3 bg-red-50 border border-red-200 rounded-md">Notice: {error}</p>}
      <PostList posts={posts} onPostUpdated={handlePostUpdated} />
    </div>
  );
};

export default HomePage;