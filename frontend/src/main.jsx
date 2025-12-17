import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RoadmapPage from './RoadmapPage.jsx';
import AddNewFeedback from './components/AddNewFeedback.jsx';
import EditFeedback from './components/EditFeedback.jsx';
import SelectedFeedback from './components/SelectedFeedback.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminManagePosts from './components/AdminManagePosts.jsx';
import AdminManageUsers from './components/AdminManageUsers.jsx';
import AdminManageCategories from './components/AdminManageCategories.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <App />,
  },
  {
    path: '/roadmap',
    element: <RoadmapPage />,
  },
  {
    path: '/addfeedback',
    element: <AddNewFeedback />,
  },
  {
    path: '/editfeedback/:id',
    element: <EditFeedback />,
  },
  {
    path: '/feedback/:id',
    element: <SelectedFeedback />,
  },
  {
    path: '/admin/posts',
    element: <AdminManagePosts />,
  },
  {
    path: '/admin/users',
    element: <AdminManageUsers />,
  },
  {
    path: '/admin/categories',
    element: <AdminManageCategories />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
