import { Route, Routes } from 'react-router-dom';
import { generateRoutes } from 'routes';
import { cloneElement } from 'react';
import { Layout, NotFound } from 'components';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {generateRoutes.map((route) => cloneElement(route))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
