import { Route } from 'react-router-dom';
import { Home, Login, Register } from 'components';
import { routes } from './routes';

export const generateRoutes = [
  <Route key={routes.HOME} path={routes.HOME} element={<Home />} />,
  <Route key={routes.REGISTER} path={routes.REGISTER} element={<Register />} />,
  <Route key={routes.LOGIN} path={routes.LOGIN} element={<Login />} />,
];
