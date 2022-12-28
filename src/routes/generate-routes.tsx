import { Layout, ProtectedRoute } from 'components';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './routes';
import { GuardAuth } from '../components/pages/guards/guard-auth';

const Home = lazy(() => import('components/pages/home'));
const NewArticle = lazy(() => import('components/organisms/new-article/new-article'));
const Profile = lazy(() => import('components/pages/profile'));
const Slug = lazy(() => import('components/organisms/slug/slug'));
const Login = lazy(() => import('components/organisms/auth-forms/login'));
const Register = lazy(() => import('components/organisms/auth-forms/register'));
const Settings = lazy(() => import('components/organisms/settings/settings'));
const ArticlesHome = lazy(() => import('components/organisms/articles-home/articles-home'));
const ArticlesProfile = lazy(
  () => import('components/organisms/articles-profile/articles-profile')
);

export const generateRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/articles/global" replace />,
      },
      {
        path: routes.HOME,
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to="/articles/global" replace />,
          },
          {
            path: routes.ARTICLES,
            element: <ArticlesHome />,
          },
        ],
      },
      {
        path: routes.PROFILE,
        element: <Profile />,
        children: [
          {
            path: routes.ARTICLES_PROFILE,
            element: <ArticlesProfile />,
          },
        ],
      },
      {
        path: routes.SETTINGS,
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.NEW_ARTICLE,
        element: (
          <ProtectedRoute>
            <NewArticle />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.SLUG,
        element: <Slug />,
      },
      {
        path: routes.REGISTER,
        element: (
          <GuardAuth>
            <Register />
          </GuardAuth>
        ),
      },
      {
        path: routes.LOGIN,
        element: (
          <GuardAuth>
            <Login />
          </GuardAuth>
        ),
      },
    ],
  },
];
