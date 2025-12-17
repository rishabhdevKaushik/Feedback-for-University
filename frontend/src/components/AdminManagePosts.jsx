import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, deletePost, getAllCategories } from '../features/social/socialSlice';
import { isUserAdmin } from '../utils/adminUtils';

function AdminManagePosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(state => state.social.posts);
  const categories = useSelector(state => state.social.categories);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = isUserAdmin();
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      navigate('/home');
      return;
    }

    dispatch(getAllPosts());
    dispatch(getAllCategories());
  }, [dispatch, navigate]);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ id: postId })).then(() => {
        dispatch(getAllPosts());
      });
    }
  };

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <div className='min-h-screen bg-grey-white p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold text-blue'>Manage Posts</h1>
          <button
            onClick={() => navigate('/home')}
            className='px-4 py-2 bg-strong-blue text-white rounded hover:bg-hover-blue'
          >
            Back to Home
          </button>
        </div>
        
        <div className='bg-white rounded-xl p-6'>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-3'>Title</th>
                  <th className='text-left p-3'>Description</th>
                  <th className='text-left p-3'>Category</th>
                  <th className='text-left p-3'>Upvotes</th>
                  <th className='text-left p-3'>Comments</th>
                  <th className='text-left p-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className='border-b hover:bg-gray-50'>
                    <td className='p-3 font-semibold text-blue'>{post.title}</td>
                    <td className='p-3 text-gray-600 max-w-xs truncate'>{post.description}</td>
                    <td className='p-3'>
                      <span className='px-2 py-1 bg-grey-white rounded text-strong-blue text-sm'>
                        {getCategoryNameById(post.category)}
                      </span>
                    </td>
                    <td className='p-3'>{post.upvotes?.totalUpvotes || 0}</td>
                    <td className='p-3'>{post.comments?.length || 0}</td>
                    <td className='p-3'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => navigate(`/feedback/${post._id}`)}
                          className='px-3 py-1 bg-strong-blue text-white text-sm rounded hover:bg-hover-blue'
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/editfeedback/${post._id}`)}
                          className='px-3 py-1 bg-strong-blue text-white text-sm rounded hover:bg-orange-600'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className='px-3 py-1 bg-red text-white text-sm rounded hover:bg-red-600'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className='text-center py-8 text-gray-600'>
                No posts found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManagePosts;