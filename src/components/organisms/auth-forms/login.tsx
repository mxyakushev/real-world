import React, { useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IUserLogin } from 'types';
import { useAppDispatch, useAuth } from 'hooks';
import { login } from 'app/store/thunks';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { routes } from 'routes';

export const Login = () => {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<FieldValues> = ({ email, password }): void => {
    const body: IUserLogin = {
      user: {
        email,
        password,
      },
    };
    dispatch(login(body)).then((r) => console.log(r));
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || routes.HOME);
    }
  }, [location, navigate, user]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => <Input {...field} placeholder="email" type="email" size="md" />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input {...field} placeholder="password" type="password" size="md" />
        )}
      />
      <Button type="submit">Sign In</Button>
      <Link to="/register">not registered</Link>
    </form>
  );
};
