import { Routes } from 'react-router-dom';
import { generateRoutes } from 'routes';
import { cloneElement } from 'react';

export const App = () => {
  return <Routes>{generateRoutes.map((route) => cloneElement(route))}</Routes>;
};
