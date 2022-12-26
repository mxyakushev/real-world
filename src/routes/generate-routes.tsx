import { Layout } from 'components';
import { lazy } from 'react';
import { routes } from './routes';

const Home = lazy(() => import('components/pages/home'));
const NewArticle = lazy(() => import('components/organisms/new-article/new-article'));
const Profile = lazy(() => import('components/pages/profile'));
const Slug = lazy(() => import('components/organisms/slug/slug'));
const Login = lazy(() => import('components/organisms/auth-forms/login'));
const Register = lazy(() => import('components/organisms/auth-forms/register'));
const Settings = lazy(() => import('components/organisms/settings/settings'));

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
        path: routes.PROFILE,
        element: <Profile />,
      },
      {
        path: routes.SETTINGS,
        element: <Settings />,
      },
      {
        path: routes.NEW_ARTICLE,
        element: <NewArticle />,
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
