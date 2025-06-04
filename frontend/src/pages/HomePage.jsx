import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';

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
        setError(error.message || "Failed to fetch posts.");
        setLoading(false); 
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; 

  return <PostList posts={posts} />;
};

export default HomePage;