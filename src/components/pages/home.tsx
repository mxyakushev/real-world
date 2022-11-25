import React from 'react';
import { authService } from 'services';
import { useAppDispatch } from 'hooks';
import { removeUser } from 'app';

export const Home = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    authService.logout();
    dispatch(removeUser());
  };
  return (
    <div>
      <h1>protected route</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
