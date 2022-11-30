import { Layout } from 'components';
import { lazy } from 'react';
import { routes } from './routes';

const Home = lazy(() => import('components/pages/home'));
const Slug = lazy(() => import('components/organisms/slug/slug'));
const Login = lazy(() => import('components/organisms/auth-forms/login'));
const Register = lazy(() => import('components/organisms/auth-forms/register'));

export const generateRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.SLUG,
        element: <Slug />,
      },
      {
        path: routes.REGISTER,
        element: <Register />,
      },
      {
        path: routes.LOGIN,
        element: <Login />,
      },
    ],
  },
];
