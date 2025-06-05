import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList'; //
import AddCommentForm from '../components/AddCommentForm'; //

const API_URL_BASE = 'http://localhost:8080/api/v1';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => { //
    try {
      setLoadingComments(true);
      const response = await axios.get(`<span class="math-inline">\{API\_URL\_BASE\}/posts/</span>{postId}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      if (!error) setError("Failed to fetch comments.");
    } finally {
      setLoadingComments(false);
    }
  }, [postId, error]);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoadingPost(true);
        const response = await axios.get(`<span class="math-inline">\{API\_URL\_BASE\}/posts/</span>{postId}`);
        setPost(response.data);
        setError(null); // Clear previous errors if post fetch is successful
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post details.");
      } finally {
        setLoadingPost(false);
      }
    };

    if (postId) {
      fetchPost();
      fetchComments();
    }
  }, [postId, fetchComments]); // fetchComments is now a dependency


  const handlePostUpdated = (updatedPostData) => {
    setPost(updatedPostData);
  };

  const handleCommentAdded = (newComment) => { //
    setComments(prevComments => [newComment, ...prevComments]); //
  };

  if (loadingPost) return <p>Loading post...</p>;
  if (error && !post) return <p className="text-red-500">Error: {error}</p>; // Show error only if post couldn't be loaded at all
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <Link to="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Back to all posts</Link>
      <PostCard post={post} onPostUpdated={handlePostUpdated} />

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <CommentList comments={comments} /> //
        )}
        {error && comments.length === 0 && <p className="text-red-500">Error loading comments: {error}</p>}
        <AddCommentForm postId={post.id} onCommentAdded={handleCommentAdded} /> {/* */}
      </div>
    </div>
  );
};

export default PostDetailPage;