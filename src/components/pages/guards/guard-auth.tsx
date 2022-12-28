import { PropsWithChildren, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import Cookies from 'js-cookie';
import { removeUser } from 'app';

export const GuardAuth = ({ children }: PropsWithChildren) => {
  const user = useAuth();
  const token = Cookies.get('token');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !token) {
      dispatch(removeUser());
      navigate(routes.LOGIN);
    }
    if (user && token) {
      navigate(routes.HOME);
    }
  }, [dispatch, navigate, token, user]);
  return <Box>{children}</Box>;
};
