import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-600">No comments yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map(comment => (
        <li key={comment.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
          <p className="text-xs text-gray-500 mt-2">
            By: {comment.commenterName} on {new Date(comment.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;