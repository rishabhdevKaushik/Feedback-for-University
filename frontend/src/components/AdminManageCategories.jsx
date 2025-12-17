import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowleft.png';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../features/social/socialSlice';
import { isUserAdmin } from '../utils/adminUtils';

function AdminManageCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(state => state.social.categories);
  const { status, error } = useSelector(state => state.social);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const adminStatus = isUserAdmin();
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      navigate('/home');
      return;
    }

    dispatch(getAllCategories());
  }, [dispatch, navigate]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      try {
        await dispatch(addCategory({ name: newCategoryName.trim() })).unwrap();
        setNewCategoryName('');
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category._id);
    setEditName(category.name);
  };

  const handleUpdateCategory = async (id) => {
    if (editName.trim() && editName !== categories.find(cat => cat._id === id)?.name) {
      try {
        await dispatch(updateCategory({ id, name: editName.trim() })).unwrap();
        setEditingCategory(null);
        setEditName('');
      } catch (error) {
        console.error('Failed to update category:', error);
      }
    } else {
      setEditingCategory(null);
      setEditName('');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await dispatch(deleteCategory({ id })).unwrap();
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditName('');
  };

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    // <div className='min-h-screen bg-grey-white p-6'>
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
            <h1 className='text-2xl font-bold text-blue'>Manage Categories</h1>
          </div>
        </div>
        
        <div className='bg-white rounded-xl p-6 mb-6'>
          <h2 className='text-lg font-semibold text-blue mb-4'>Add New Category</h2>
          <form onSubmit={handleAddCategory} className='flex gap-3'>
            <input
              type='text'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder='Category name'
              className='flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-strong-blue'
              disabled={status === 'loading'}
            />
            <button
              type='submit'
              disabled={status === 'loading' || !newCategoryName.trim()}
              className='px-4 py-2 bg-strong-blue text-white rounded hover:bg-hover-blue disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {status === 'loading' ? 'Adding...' : 'Add Category'}
            </button>
          </form>
          {error && (
            <div className='mt-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded'>
              {error}
            </div>
          )}
        </div>
        
        <div className='bg-white rounded-xl p-6'>
          <h2 className='text-lg font-semibold text-blue mb-4'>Existing Categories</h2>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-3'>Name</th>
                  <th className='text-left p-3'>ID</th>
                  <th className='text-left p-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>
                      {editingCategory === category._id ? (
                        <div className='flex gap-2'>
                          <input
                            type='text'
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className='px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-strong-blue'
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdateCategory(category._id)}
                            className='px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600'
                            disabled={status === 'loading'}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className='px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600'
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className='font-semibold text-blue'>{category.name}</span>
                      )}
                    </td>
                    <td className='p-3 text-gray-600 font-mono text-sm'>{category._id}</td>
                    <td className='p-3'>
                      {editingCategory === category._id ? null : (
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleEditCategory(category)}
                            className='px-3 py-1 bg-strong-blue text-white text-sm rounded hover:bg-orange-600'
                            disabled={status === 'loading'}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className='px-3 py-1 bg-red text-white text-sm rounded hover:bg-red-600'
                            disabled={status === 'loading'}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <div className='text-center py-8 text-gray-600'>
                No categories found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManageCategories;