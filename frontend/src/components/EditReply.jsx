import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReply, deleteReply, getAllReplies } from '../features/social/socialSlice';

function EditReply({ reply, onCancel }) {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState(reply.content);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    if (replyText.trim()) {
      try {
        await dispatch(updateReply({ id: reply._id, content: replyText })).unwrap();
        dispatch(getAllReplies()); // Refresh replies
        onCancel(); // Close edit mode
      } catch (error) {
        console.error('Error updating reply:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteReply({ id: reply._id })).unwrap();
        dispatch(getAllReplies()); // Refresh replies
        onCancel(); // Close edit mode
      } catch (error) {
        console.error('Error deleting reply:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className='mb-6 flex w-full flex-col gap-4'>
      <textarea
        onChange={e => setReplyText(e.target.value)}
        value={replyText}
        className='h-20 w-full rounded-xl bg-grey-white2 p-4 focus:outline-strong-blue'
        placeholder='Edit your reply...'
      />
      <div className='flex gap-2'>
        <button
          onClick={handleUpdate}
          disabled={!replyText.trim()}
          className='whitespace-nowrap rounded-xl bg-purple px-4 py-2 text-sm text-white hover:bg-hover-purple disabled:opacity-50'
        >
          Update Reply
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

export default EditReply;