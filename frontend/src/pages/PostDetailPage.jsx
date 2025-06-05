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
  const [error, setError] = useState(null);

  const fetchCommentsCallback = useCallback(async () => {
    if (!postId) return;
    setLoadingComments(true);
    try {
      const response = await axios.get(`${API_URL_BASE}/posts/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      let errorMessage = "Failed to fetch comments.";
      if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
      }
      setError(prevError => prevError ? `${prevError} ${errorMessage}` : errorMessage);
    } finally {
      setLoadingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setLoadingPost(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL_BASE}/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        let errorMessage = "Failed to fetch post details.";
        if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
        }
        setError(errorMessage);
        setPost(null);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
    fetchCommentsCallback();
  }, [postId, fetchCommentsCallback]);

  const handlePostUpdated = (updatedPostData) => {
    setPost(updatedPostData);
  };

  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
    if (post) {
        setPost(prevPost => ({
            ...prevPost,
            commentCount: (prevPost.commentCount || 0) + 1
        }));
    }
  };

  if (loadingPost) return <p className="text-center text-slate-500 py-10">Loading post details...</p>;
  if (error && !post) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (!post) return <p className="text-center text-slate-500 py-10">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-sky-600 hover:text-sky-700 hover:underline transition-colors duration-150">
          &larr; Back to all posts
        </Link>
      </div>
      <PostCard post={post} onPostUpdated={handlePostUpdated} />

      <div className="mt-8 bg-white shadow-sm rounded-lg p-5 sm:p-6 border border-slate-200">
        <h3 className="text-xl font-medium mb-5 text-slate-700">Comments</h3>
        {loadingComments && <p className="text-slate-500">Loading comments...</p>}
        {!loadingComments && <CommentList comments={comments} />}
        {error && comments.length === 0 && !loadingComments && !loadingPost && <p className="text-red-500 text-sm mt-2">Could not load comments.</p>}
        <AddCommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
};

export default PostDetailPage;