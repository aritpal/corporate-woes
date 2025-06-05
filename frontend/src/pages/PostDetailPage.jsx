import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';
import AddCommentForm from '../components/AddCommentForm';

const API_URL_BASE = 'http://localhost:8080/api/v1';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null); // Consolidated error state

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setLoadingComments(true);
    try {
      const response = await axios.get(`${API_URL_BASE}/posts/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(prevError => prevError || "Failed to fetch comments."); // Keep existing post error if any
    } finally {
      setLoadingComments(false);
    }
  }, [postId]); // Removed 'error' from here to avoid loop if error is set by fetchPost

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setLoadingPost(true);
      setError(null); // Reset error before fetching post
      try {
        const response = await axios.get(`${API_URL_BASE}/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post details.");
        setPost(null); // Ensure post is null on error
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
    fetchComments(); // Fetch comments after post or concurrently
  }, [postId, fetchComments]);

  const handlePostUpdated = (updatedPostData) => {
    setPost(updatedPostData);
  };

  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
    // Optionally, update the comment count on the main 'post' object if it's part of its DTO
    if (post) {
        setPost(prevPost => ({
            ...prevPost,
            commentCount: (prevPost.commentCount || 0) + 1
        }));
    }
  };

  if (loadingPost) return <p>Loading post details...</p>;
  if (error && !post) return <p className="text-red-500">Error: {error}</p>; // Show error only if post truly failed to load
  if (!post) return <p>Post not found or failed to load.</p>;

  return (
    <div>
      <Link to="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Back to all posts</Link>
      <PostCard post={post} onPostUpdated={handlePostUpdated} />

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <CommentList comments={comments} />
        )}
        {/* Display comment fetching error separately if needed */}
        {error && comments.length === 0 && !loadingComments && <p className="text-red-500">Could not load comments.</p>}
        <AddCommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
};

export default PostDetailPage;