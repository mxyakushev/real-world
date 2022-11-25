import React, { useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IUserRegister } from 'types';
import { useAppDispatch, useAuth } from 'hooks';
import { register } from 'app/store/thunks';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';

export const Register = () => {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const submit: SubmitHandler<FieldValues> = ({ username, email, password }): void => {
    const body: IUserRegister = {
      user: {
        username,
        email,
        password,
      },
    };
    dispatch(register(body)).then((r) => console.log(r));
  };

  useEffect(() => {
    if (user) {
      navigate(routes.HOME);
    }
  }, [navigate, user]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="username"
        render={({ field }) => <Input {...field} placeholder="username" type="text" size="md" />}
      />
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
      <Button type="submit">Sign Up</Button>
      <Link to="/login">already have an account</Link>
    </form>
  );
};
