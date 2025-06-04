import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm'; //

const API_URL = 'http://localhost:8080/api/v1/posts';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handlePostCreated = (newPost) => { //
    setPosts(prevPosts => [newPost, ...prevPosts]); //
  };

  if (loading) return <p>Loading...</p>;
  if (error && posts.length === 0) return <p>Error: {error}</p>;

  return (
    <div>
      <CreatePostForm onPostCreated={handlePostCreated} /> //
      {error && <p className="text-red-500 text-sm mb-3">Error fetching new posts, but showing cached ones: {error}</p>}
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;