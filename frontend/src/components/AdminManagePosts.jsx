import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowleft.png';
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
    <div className='min-w-screen absolute left-0 right-0 top-0 
                    min-h-full bg-grey-white p-6 pb-24 xs:px-3 s:px-6 md:px-10 md:pb-32 md:pt-14
                    xl:px-80 xl:pb-32 xl:pt-20'>
      <div className='max-w-6xl mx-auto'>
        <div className='relative flex items-center mb-[2.125rem]'>
          <button
            onClick={() => navigate('/home')}
            className='flex items-center gap-2 bg-transparent border-none cursor-pointer z-10'
          >
            <img className='h-2 w-1' src={arrowleft} alt='arrowback' />
            <p className='px13 font-bold text-gray-600 hover:text-black md:text-sm'>
              Go Back
            </p>
          </button>
          <div className='absolute left-1/2 transform -translate-x-1/2'>
            <h1 className='text-2xl font-bold text-blue'>Manage Posts</h1>
          </div>
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