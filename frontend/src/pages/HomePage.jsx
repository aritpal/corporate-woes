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
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === updatedPost.id ? updatedPost : p
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error && posts.length === 0) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <CreatePostForm onPostCreated={handlePostCreated} />
      {error && <p className="text-red-500 text-sm my-2">Error fetching posts: {error}. Displaying cached posts if available.</p>}
      <PostList posts={posts} onPostUpdated={handlePostUpdated} />
    </div>
  );
};

export default HomePage;