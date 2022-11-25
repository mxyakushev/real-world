import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const Layout = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <Outlet />
    </div>
  );
};
