import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className='rounded-xl bg-white p-4 xs:mx-3 s:mx-6 md:m-0 md:w-1/3 md:p-4 lg:mx-2 lg:w-1/3 xl:m-0 xl:w-full xl:min-w-64 flex flex-col'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-lg font-bold tracking-[-0.25px] text-blue'>
          Admin Dashboard
        </h1>
      </div>
      <div className='flex flex-col gap-2 flex-1'>
        <Link
          to='/admin/posts'
          className='block rounded-lg bg-strong-blue px-3 py-2 text-center text-white text-sm font-semibold hover:bg-hover-blue transition-colors'
        >
          Manage Posts
        </Link>
        <Link
          to='/admin/users'
          className='block rounded-lg bg-strong-blue px-3 py-2 text-center text-white text-sm font-semibold hover:bg-hover-blue transition-colors'
        >
          Manage Users
        </Link>
        <Link
          to='/admin/categories'
          className='block rounded-lg bg-strong-blue px-3 py-2 text-center text-white text-sm font-semibold hover:bg-hover-blue transition-colors'
        >
          Manage Categories
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;