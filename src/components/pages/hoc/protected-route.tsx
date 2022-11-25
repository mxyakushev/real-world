import { FC } from 'react';
import { useAuth } from 'hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from 'routes';

interface IProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProps> = ({ children }) => {
  const user = useAuth();
  const location = useLocation();
  return user ? children : <Navigate replace to={routes.LOGIN} state={{ from: location }} />;
};
