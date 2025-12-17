import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment, deleteComment, getAllComments } from '../features/social/socialSlice';

function EditComment({ comment, onCancel }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState(comment.content);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    if (commentText.trim()) {
      try {
        await dispatch(updateComment({ id: comment._id, content: commentText })).unwrap();
        dispatch(getAllComments()); // Refresh comments
        onCancel(); // Close edit mode
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteComment({ id: comment._id })).unwrap();
        dispatch(getAllComments()); // Refresh comments
        onCancel(); // Close edit mode
      } catch (error) {
        console.error('Error deleting comment:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className='mb-6 flex w-full flex-col gap-4'>
      <textarea
        onChange={e => setCommentText(e.target.value)}
        value={commentText}
        className='h-20 w-full rounded-xl bg-grey-white2 p-4 focus:outline-strong-blue'
        placeholder='Edit your comment...'
      />
      <div className='flex gap-2'>
        <button
          onClick={handleUpdate}
          disabled={!commentText.trim()}
          className='whitespace-nowrap rounded-xl bg-purple px-4 py-2 text-sm text-white hover:bg-hover-purple disabled:opacity-50'
        >
          Update Comment
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className='whitespace-nowrap rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50'
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        <button
          onClick={onCancel}
          className='whitespace-nowrap rounded-xl bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditComment;