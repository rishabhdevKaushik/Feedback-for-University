import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowleft.png';
import { getAllUsers, deleteUser } from '../features/social/socialSlice';
import { isUserAdmin } from '../utils/adminUtils';

function AdminManageUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.social.users);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      try {
        await dispatch(deleteUser({ id: userId })).unwrap();
        alert('User deleted successfully');
      } catch (error) {
        alert('Failed to delete user: ' + (error.message || 'Unknown error'));
      }
    }
  };

  useEffect(() => {
    const adminStatus = isUserAdmin();
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      navigate('/home');
      return;
    }

    dispatch(getAllUsers());
  }, [dispatch, navigate]);

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
            <h1 className='text-2xl font-bold text-blue'>Manage Users</h1>
          </div>
        </div>
        
        <div className='bg-white rounded-xl p-6'>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-3'>Name</th>
                  <th className='text-left p-3'>Username</th>
                  <th className='text-left p-3'>Email</th>
                  <th className='text-left p-3'>Role</th>
                  <th className='text-left p-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  console.log('User:', user);
                  return (
                  <tr key={user._id} className='border-b hover:bg-gray-50'>
                    <td className='p-3 font-semibold text-blue'>
                      {user.firstname} {user.lastname}
                    </td>
                    <td className='p-3 text-gray-600'>@{user.username}</td>
                    <td className='p-3 text-gray-600'>{user.email}</td>
                    <td className='p-3'>
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.username === 'admin' 
                          ? 'bg-grey-white text-red' 
                          : 'bg-grey-white text-strong-blue'
                      }`}>
                        {user.username === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className='p-3'>
                      <div className='flex gap-2'>
                        {/* <button
                          className='px-3 py-1 bg-strong-blue text-white text-sm rounded hover:bg-hover-blue'
                          disabled
                        >
                          View Profile
                        </button> */}
                        {user.username !== 'admin' && (
                          <button
                            className='px-3 py-1 bg-red text-white text-sm rounded hover:bg-red-600'
                            onClick={() => handleDeleteUser(user._id, user.username)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className='text-center py-8 text-gray-600'>
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManageUsers;