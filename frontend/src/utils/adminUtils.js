// Utility functions for admin functionality

export const isUserAdmin = () => {
  const username = localStorage.getItem('username');
  return username === 'admin';
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const getUserId = () => {
  return localStorage.getItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};