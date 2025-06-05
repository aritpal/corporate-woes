import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-slate-600 py-4">No comments yet. Be the first!</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map(comment => (
        <li key={comment.id} className="p-4 border border-slate-200 rounded-md bg-slate-50">
          <p className="text-slate-700 whitespace-pre-wrap text-sm">{comment.content}</p>
          <p className="text-xs text-slate-400 mt-2">
            By: {comment.commenterName} - {new Date(comment.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;